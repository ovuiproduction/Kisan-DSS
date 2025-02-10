from flask import Flask,request, render_template,jsonify
import pickle
import pandas as pd
import os
from dotenv import load_dotenv
import numpy as np
import json
import google.generativeai as genai
import re
import random
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)

#loading models
try:
    # Yield prediction model and preprocessor
    yield_model = pickle.load(open('models/cropyield/model.pkl', 'rb'))
    yield_preprocessor = pickle.load(open('models/cropyield/preprocessor.pkl', 'rb'))
    # WPI model and preprocessor
    wpi_model = pickle.load(open('models/wpi/model.pkl', 'rb'))
    wpi_preprocessor = pickle.load(open('models/wpi/preprocessor.pkl', 'rb'))
    # Market price model
    market_price_model = pickle.load(open('models/marketprice/model.pkl', 'rb'))
    market_price_preprocessor = pickle.load(open('models/marketprice/preprocessor.pkl', 'rb'))
     # rainfall prediction model and preprocessor
    rainfall_model = pickle.load(open('models/rainfall/model.pkl', 'rb'))
    rainfall_preprocessor = pickle.load(open('models/rainfall/preprocessor.pkl', 'rb'))
    # temperature model and preprocessor
    temperature_model = pickle.load(open('models/temperature/model.pkl', 'rb'))
    temperature_preprocessor = pickle.load(open('models/temperature/preprocessor.pkl', 'rb'))
    
except FileNotFoundError as e:
    raise FileNotFoundError(f"Required file missing: {e}")



# crop images
crop_images = {
    'KHARIF SORGHUM': '/static/images/jowarlogo.webp',
    'COTTON': '/static/images/cottonlogo.jpg',
    'SUGARCANE': '/static/images/sugarcanelogo.jpg',
    'PEARL MILLET': '/static/images/bajralogo.jpg',
    'RICE': '/static/images/rice_img.avif',
    'MAIZE': '/static/images/maize_img.jpg',
    'FINGER MILLET': '/static/images/finger_millet_img.webp',
    'PIGEONPEA': '/static/images/Pigeonpea_img.jpg',
    'MINOR PULSES': '/static/images/MinorPulses_img.jpeg',
    'GROUNDNUT': '/static/images/groundnut_img.jpg',
    'SESAMUM': '/static/images/Sesamum_img.webp',
    'SUNFLOWER': '/static/images/Sunflower_img.jpg',
    'SOYABEAN': '/static/images/Soyabean_img.webp',
}

# gemini configuration
API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key = API_KEY)
geminimodel = genai.GenerativeModel("gemini-1.5-flash")

# gemini request
def gemini_response(Prompt):
    response = geminimodel.generate_content(Prompt)
    return response

# format data (gemini response)
def get_data(Prompt):
    response = gemini_response(Prompt)
    try:
        json_string = response.text.strip()
        json_string = re.sub(r"```(?:json)?\s*", "", json_string)
        json_string = re.sub(r"```", "", json_string)
        json_data = json.loads(json_string)
        return json_data
    
    except json.JSONDecodeError as e:
        print("Error parsing JSON:", e)
        return None
    except Exception as e:
        print("Error:", e)
        return None

# Gemini in use
def geminiInUse(cropname):
    # Market Info
    Prompt = f"""Provide information about the 5 best markets for selling {cropname} in Maharashtra in JSON format. The JSON should be an array of objects. Each object should have the following keys: 'market_name', 'strengths' (an array of strings), and 'best_for'.do not write the disclaimer only json data of markets"""
    market_data = get_data(Prompt)
    
    # Goverment Schemes
    Prompt = f"""Provide information about 3 Indian government schemes related to {cropname} farming in JSON format. The JSON should be an array of objects. Each object should have the following keys: 'scheme_name', 'purpose', and 'benefits' (which should be an array of strings). do not write the disclaimer or extra information only json data of goverment scheme in specified format"""
    goverment_data = get_data(Prompt)
    
    return market_data,goverment_data

# rainfall and temperature prediction
def rainfallAndTempreturePrediction(subdivision,year):
    months = random.sample(range(1, 13), 6)
    aggregated_rainfall = 0
    aggregated_temperature = 0
        
    for month in months:
        # rainfall predictions
        column_names_rainfall_model = ['SUBDIVISION','YEAR','MONTH']
        features = [[subdivision,year,month]]
        features_df = pd.DataFrame(features, columns=column_names_rainfall_model)
        transformed_features = rainfall_preprocessor.transform(features_df)
        prediction = rainfall_model.predict(transformed_features).reshape(1,-1)
        rainfall = round(prediction[0][0] , 2)
        aggregated_rainfall+=rainfall
    
        # tempreture prediction
        column_names_temperature_model = ['YEAR','MONTH']
        features = [[year,month]]
        features_df = pd.DataFrame(features, columns=column_names_temperature_model)
        transformed_features = temperature_preprocessor.transform(features_df)
        prediction = temperature_model.predict(transformed_features).reshape(1,-1)
        temperature = round(prediction[0][0] , 2)
        aggregated_temperature+=temperature
    
    aggregated_rainfall = round(aggregated_rainfall/6,2)
    aggregated_temperature = round(aggregated_temperature/6,2)
   
    return aggregated_rainfall,aggregated_temperature


# yield prediction function
def yieldPrediction(year, dist, cropname,area,aggregated_rainfall,aggregated_temperature):
    column_names = ['Year', 'Dist Name', 'Crop','Area(1000 ha)','Total Rainfall','Avg Temp']
    features = [[year, dist, cropname,area,aggregated_rainfall,aggregated_temperature]]
    features_df = pd.DataFrame(features, columns=column_names)
    transformed_features = yield_preprocessor.transform(features_df)
    prediction = yield_model.predict(transformed_features).reshape(1,-1)
    predicted_value = round(prediction[0][0] , 2)
    return predicted_value

def pricePrediction(dist,market, cropname,variety,year,month,aggregated_rainfall):
    column_names = ['District', 'Market', 'Commodity', 'Variety', 'Year', 'Month','Rainfall']
    features = [[dist,market, cropname,variety,year,month,aggregated_rainfall]]
    features_df = pd.DataFrame(features, columns=column_names)
    transformed_features = market_price_preprocessor.transform(features_df)
    prediction = market_price_model.predict(transformed_features).reshape(1,-1)
    predicted_value = round(prediction[0][0] , 2)
    return predicted_value


@app.route('/')
def index():
    return ("Server running on localhost:5000")


@app.route('/intel-market-price',methods=['POST'])
def resultprice():
    cropname = request.form['cropname']
    year = int(request.form['year'])
    dist = request.form['dist']
    month = request.form['month']
    # state = request.form['state']
    market = request.form['market']
    variety = request.form['variety']
    subdivision = "Madhya Maharashtra"
    # current year rainfall and temperature prediction
    aggregated_rainfall,curr_aggregated_temperature = rainfallAndTempreturePrediction(subdivision,year)
    predicted_price = pricePrediction(dist,market, cropname,variety,year,month,aggregated_rainfall)
    return jsonify({'predicted_price':predicted_price})


# result route
@app.route('/intel-yield',methods=['POST'])
def result():
    if request.method == 'POST':
        cropname = request.form['cropname']
        year = int(request.form['year'])
        dist = request.form['dist']
        season = request.form['season']
        state = request.form['state']
        subdivision = request.form['subdivision']
        area = float(request.form['area'])
        fp_per_unit_area = float(request.form['fp_per_unit_area'])
        
        # current year rainfall and temperature prediction
        curr_aggregated_rainfall,curr_aggregated_temperature = rainfallAndTempreturePrediction(subdivision,year)
        # current year crop yield
        curr_year_prediction = yieldPrediction(year, dist, cropname,area,curr_aggregated_rainfall,curr_aggregated_temperature)
        # current year crop yield in tonnes
        curr_year_prediction_tonnes = round(curr_year_prediction/1000,2)
        
        # Gemini In Use
        market_data,goverment_data = geminiInUse(cropname)
        
        return jsonify({
    'curr_year_prediction': curr_year_prediction,
    'cropface' : crop_images.get(cropname),
    'cropname': cropname,
    'state': state,
    'dist': dist,
    'subdivision': subdivision,
    'area': area,
    'average_rain_fall': curr_aggregated_rainfall,
    'temperature': curr_aggregated_temperature,
    'fp_per_unit_area': fp_per_unit_area,
    'year': year,
    'season': season,
    'curr_year_prediction_tonnes': curr_year_prediction_tonnes,
    'market_data': market_data,
    'goverment_data': goverment_data
})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
