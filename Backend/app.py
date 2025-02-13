from flask import Flask,request, render_template,jsonify
import requests
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
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# # OpenRouteService API key
# API_KEY = "5b3ce3597851110001cf6248583463e809554709962155c80ab88883"  # Replace with your actual API key

# @app.route('/api/distance', methods=['POST'])
# def get_distance():
#     print("request arrived")
#     try:
#         # Get JSON data from request
#         data = request.get_json()

#         # Make request to OpenRouteService
#         headers = {
#             "Authorization": API_KEY,
#             "Content-Type": "application/json"
#         }
#         response = requests.post("https://api.openrouteservice.org/v2/matrix/driving-car", json=data, headers=headers)

#         # Return response
#         print(response.json())
#         return jsonify(response.json()), response.status_code

#     except requests.exceptions.RequestException as e:
#         return jsonify({"error": str(e)}), 500

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


# Crop MSP and Average Price Dictionary (Prices in INR per Quintal)
commodity_price = {
    'Bajra': {'avg_price': 1900, 'msp_price': 2500},
    'Barley': {'avg_price': 1600, 'msp_price': 2200},
    'Cotton': {'avg_price': 5500, 'msp_price': 6620},
    'Gram': {'avg_price': 4500, 'msp_price': 5440},
    'Groundnut': {'avg_price': 5000, 'msp_price': 6377},
    'Jowar': {'avg_price': 2300, 'msp_price': 3180},
    'Maize': {'avg_price': 1800, 'msp_price': 2225},
    'Masoor': {'avg_price': 4600, 'msp_price': 6400},
    'Moong': {'avg_price': 6000, 'msp_price': 8558},
    'Soyabean': {'avg_price': 3500, 'msp_price': 4600},
    'Sugarcane': {'avg_price': 290, 'msp_price': 315},  # Per Quintal
    'Tur': {'avg_price': 5000, 'msp_price': 7000},
    'Urad': {'avg_price': 4800, 'msp_price': 6950},
    'Wheat': {'avg_price': 2100, 'msp_price': 2275}
}

markets_data = {
    "Kolhapur": ["Kolhapur", "Vadgaonpeth"],
    "Pune": [
        "Pune", "Pune(Pimpri)", "Junnar(Otur)", "Pune(Moshi)", "Junnar(Alephata)", 
        "Manchar", "Junnar", "Nira(Saswad)", "Pune(Khadiki)", "Shirur", "Baramati", 
        "Nira", "Khed(Chakan)", "Bhor", "Pune(Manjri)", "Indapur(Nimgaon Ketki)", 
        "Dound", "Indapur", "Mulshi", "Junnar(Narayangaon)", "Indapur(Bhigwan)"
    ],
    "Sangli": [
        "Sangli", "Vita", "Islampur", "Sangli(Miraj)", "Palus", 
        "Sangli(Phale, Bhajipura Market)", "Tasgaon"
    ],
    "Satara": ["Vai", "Satara", "Phaltan", "Vaduj", "Karad", "Koregaon", "Lonand"],
    "Solapur": [
        "Akluj", "Laxmi Sopan Agriculture Produce Marketing Co Ltd", "Pandharpur", 
        "Mangal Wedha", "Mohol", "Kurdwadi(Modnimb)", "Karmala", "Barshi", "Solapur", 
        "Dudhani", "Akkalkot", "Barshi(Vairag)", "Kurdwadi"
    ]
}

# for yield and market price model
def getMahaAnnualRainfall(year,district):
    print("request recevived")
    prompt = f"""Analyze the previous rainfall conditions and pattern in Maharashtra state and predict 
                the Annual rainfall for year : {year} and district :{district} in maharashtra. 
                you need to predict the rainfall year and district wise.
                Output the rainfall in mm. only rainfall value , No any explanation or other text
                output in json format.
                ### ouput format :  34.5 
                """
    rainfall = get_data(prompt)
    return rainfall

# for wpi model
def getIndiaRainfallMonthly(year,month):
    prompt = f"""Analyze the previous rainfall conditions and pattern in India and predict 
                the rainfall for year : {year} and month {month} in india. 
                Output the rainfall in mm. only rainfall value , No any explanation or other text.
                output in json format.
                ### ouput format :  154.5 
                """
    rainfall = get_data(prompt)
    return rainfall

# for yield temperature
def getMahaTemp(year,district):
    prompt = f"""Analyze the previous temperature conditions and pattern in maharashtra and predict the     
                temperature for year : {year} and district {district} in maharashtra.  
                Output the temperature in Celsius.
                you need to predict the temperature according to year, and district in maharashtra.
                only temperature value , No any explanation or other text.
                output in json format.
                ### ouput format :  25.5 
                """
    temperature = get_data(prompt)
    return temperature

def getCropSelectionConclusion(IntelCropData,Nitrogen,Potassium,Phosphorus,soilColor,pH):
    Prompt = f"""
        You are an expert in crop selection. I will provide you with data that includes:
        The expected total price and yield for various crops.
        Meteorological and soil data relevant to crop growth.
        Based on this data, suggest the most profitable crop that is also suitable for the given soil conditions.
        In output only suggested crop and reasoning no any desclaimers.
        Output Format: JSON 
        suggested_crop
        reasoning
        
        Price and yield data : {IntelCropData},
        Nitrogen : {Nitrogen},
        Potassium : {Potassium},
        Phosphorus : {Phosphorus},
        soilColor : {soilColor},
        pH : {pH}
    """
    data = get_data(Prompt)
    return data

def getMarketSelectionConclusion(MarketData,sourceDistrict):
    Prompt = f"""
            You are expert in market selection i will provide you the market and the crop prices in that market.
            your job is to guide the farmer to decide the market which gives highest profit.
            On the basis of crop price in that market.
            In output no any desclaimers.
            
            output format : JSON
            suggested_market
            reasoning
            
            marketData : {MarketData}
            sourceDistrict : {sourceDistrict}
    """
    data = get_data(Prompt)
    return data

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
def yieldPrediction(Year, District, Commodity, Area, Rainfall, Temperature, Soil_color, Fertilizer, Nitrogen, Phosphorus, Potassium, pH):
    column_names = ['Year', 'District', 'Commodity', 'Area', 'Rainfall', 'Temperature','Soil_color','Fertilizer', 'Nitrogen', 'Phosphorus', 'Potassium', 'pH']
    features = [[Year, District, Commodity, Area, Rainfall, Temperature, Soil_color, Fertilizer, Nitrogen, Phosphorus, Potassium, pH]]
    features_df = pd.DataFrame(features, columns=column_names)
    transformed_features = yield_preprocessor.transform(features_df)
    prediction = yield_model.predict(transformed_features).reshape(1,-1)
    predicted_yield = round(prediction[0][0] , 2)
    return predicted_yield

# market price
def marketPricePrediction(District, Market, Commodity, Year, Month, Rainfall):
    column_names = ['District', 'Market', 'Commodity', 'Year', 'Month','Rainfall']
    features = [[District, Market, Commodity, Year, Month, Rainfall]]
    features_df = pd.DataFrame(features, columns=column_names)
    transformed_features = market_price_preprocessor.transform(features_df)
    prediction = market_price_model.predict(transformed_features).reshape(1,-1)
    predicted_market_price = round(prediction[0][0] , 2)
    return predicted_market_price

def marketPriceSeries(District, Commodity, Year, Month):
    markets = markets_data.get(District, [])  # Use .get() to avoid KeyError
    marketPriceData = {}
    
    Rainfall = getMahaAnnualRainfall(Year, District)
    
    for Market in markets:
        marketPrice = marketPricePrediction(District, Market, Commodity, Year, Month, Rainfall)
        marketPriceData[Market] = marketPrice  # Correct way to add key-value pair
    
    return marketPriceData

# wpi prediction
def wpiPrediction(Commodity, Month, Year, Rainfall):
    column_names = ['Commodity','Month','Year','Rainfall']
    features = [[Commodity, Month, Year, Rainfall]]
    features_df = pd.DataFrame(features, columns=column_names)
    transformed_features = wpi_preprocessor.transform(features_df)
    prediction = wpi_model.predict(transformed_features).reshape(1,-1)
    predicted_wpi = round(prediction[0][0] , 2)
    return predicted_wpi

# wpi price calculation
def wpiPricePrediction(Commodity, Month, Year, Rainfall):
    wpi = wpiPrediction(Commodity, Month, Year, Rainfall)
    commodity_avg_price = commodity_price[Commodity]['avg_price']
    commodity_msp_price = commodity_price[Commodity]['msp_price']
    min_wpi_price = round((wpi*commodity_avg_price)/100,2)
    max_wpi_price = round((wpi*commodity_msp_price)/100,2)
    avg_wpi_price = round((min_wpi_price + max_wpi_price) / 2,2)
    return min_wpi_price,max_wpi_price,avg_wpi_price

def wpiPriceWholeYear(Commodity,Year):
    min_price_data = []
    msp_data = []
    Month = 1 
    rainfallData = [1,2,3,1,8,673,1318,779,408,106,44,8]
    x_count =0 
    for rainfall in rainfallData:
        min_wpi_price,max_wpi_price,avg_wpi_price = wpiPricePrediction(Commodity,Month,Year,rainfall)
        msp_data.append(max_wpi_price)
        min_price_data.append(min_wpi_price)
        Month = Month + 1
        x_count = x_count + 1
    return min_price_data,msp_data

def getIntelCropData(Commoditys, Year, Month, District, Area, Nitrogen, Potassium, Phosphorus, Fertilizer, soilColor, pH):
    wpi_Rainfall = getIndiaRainfallMonthly(Year, Month)
    Rainfall = getMahaAnnualRainfall(Year, District)
    Temperature = getMahaTemp(Year, District)
    IntelCroprecData = {}

    for Commodity in Commoditys:
        min_wpi_price, max_wpi_price, predicted_price = wpiPricePrediction(Commodity, Month, Year, wpi_Rainfall)
        predicted_yield = yieldPrediction(Year, District, Commodity, Area, Rainfall, Temperature, soilColor, Fertilizer, Nitrogen, Phosphorus, Potassium, pH)
        totalPrice = round((predicted_yield*Area*predicted_price), 2)
        
        # Corrected dictionary assignment
        IntelCroprecData[Commodity] = {
            "predicted_price": predicted_price,
            "predicted_yield": predicted_yield,
            "area":Area,
            "totalPrice": totalPrice
        }
    return IntelCroprecData


@app.route('/')
def index():
    return ("Server running on localhost:5000")


@app.route('/intel-market-price',methods=['POST'])
def marketPrice():
    data = request.get_json()
    Commodity = data.get('commodity')
    Year = data.get('year')
    Month = data.get('month')
    District = data.get('district')
    sourceDistrict = data.get('sourceDistrict')
    marketPriceData = marketPriceSeries(District, Commodity, Year, Month)
    conclusion = getMarketSelectionConclusion(marketPriceData,sourceDistrict)
    return jsonify({'data':marketPriceData,'conclusion':conclusion})

@app.route('/intel-wpi-price',methods=['POST'])
def IntelWPI():
    if request.method == 'POST':
        data = request.get_json()
        Commodity = data.get('commodity')
        Year = data.get('year')
        Month = data.get('month')
        
        Year = int(Year)
        Month = int(Month)
        
        Rainfall = getIndiaRainfallMonthly(Year,Month)
        
        avgPrice,minPrice,maxPrice = wpiPricePrediction(Commodity,Month,Year,Rainfall)
        
        minPriceCurrSeries,maxPriceCurrSeries = wpiPriceWholeYear(Commodity,Year)
        minPriceNextSeries,maxPriceNextSeries = wpiPriceWholeYear(Commodity,Year+1)
        
        maxMSPPrice = max(maxPriceCurrSeries)
        maxAvgPrice = max(minPriceCurrSeries)
        minMSPPrice = min(maxPriceCurrSeries)
        minAvgPrice = min(minPriceCurrSeries)

        goldMonthIndex = maxPriceCurrSeries.index(maxMSPPrice) + 1
        silverMonthIndex = maxPriceCurrSeries.index(minMSPPrice) + 1
        
        return jsonify({
            'rainfall':Rainfall,
            'commodity':Commodity,
            'year':Year,
            'month':Month,
            'avgPrice':avgPrice,
            'minPrice':minPrice,
            'maxPrice':maxPrice,
            'minPriceCurrSeries':minPriceCurrSeries,
            'maxPriceCurrSeries':maxPriceCurrSeries,
            'minPriceNextSeries':minPriceNextSeries,
            'maxPriceNextSeries':maxPriceNextSeries,
            'maxMSPPrice':maxMSPPrice,
            'maxAvgPrice':maxAvgPrice,
            'minMSPPrice':minMSPPrice,
            'minAvgPrice':minAvgPrice,
            'goldMonthIndex':goldMonthIndex,
            'silverMonthIndex':silverMonthIndex,
        })
        
        
@app.route('/intel-crop-recommendation',methods=['POST'])
def IntelCropRec():
    if request.method == 'POST':
        data = request.get_json()
        Commoditys = data.get('crops')
        Year = data.get('year')
        Month = data.get('month')
        District = data.get('district')
        Area = data.get('area')
        Fertilizer = data.get('fertilizer')
        Nitrogen = data.get('nitrogen')
        Phosphorus = data.get('phosphorus')
        Potassium = data.get('potassium')
        pH = data.get('pH')
        soilColor  = data.get("soilColor")
        try:
            Year = int(Year)
            Month = int(Month)
            Area = float(Area)
            Nitrogen = float(Nitrogen)
            Phosphorus = float(Phosphorus)
            Potassium = float(Potassium)
            pH = float(pH)
        except ValueError:
            print("Error data conversion")
            return jsonify({"error": "Invalid input format for numbers"}), 400

        IntelCropData = getIntelCropData(Commoditys,Year,Month,District,Area,Nitrogen,Potassium,Phosphorus,Fertilizer,soilColor,pH)
        conclusion = getCropSelectionConclusion(IntelCropData,Nitrogen,Potassium,Phosphorus,soilColor,pH)
        return jsonify({'data':IntelCropData,'conclusion':conclusion})
    
# result route
@app.route('/intel-yield',methods=['POST'])
def IntelYield():
    if request.method == 'POST':
        data = request.get_json()
        Commodity = data.get('commodity')
        Year = data.get('year')
        District = data.get('district')
        Area = data.get('area')
        Soil_color = data.get('soilColor')
        Fertilizer = data.get('fertilizer')
        Nitrogen = data.get('nitrogen')
        Phosphorus = data.get('phosphorus')
        Potassium = data.get('potassium')
        pH = data.get('pH')

        if not all([Commodity, Year, District, Area, Soil_color, Fertilizer, Nitrogen, Phosphorus, Potassium, pH]):
            return jsonify({"error": "All fields are required"}), 400

        try:
            Year = int(Year)
            # Month = int(Month)
            Area = float(Area)
            Nitrogen = float(Nitrogen)
            Phosphorus = float(Phosphorus)
            Potassium = float(Potassium)
            pH = float(pH)
        except ValueError:
            print("Error data conversion")
            return jsonify({"error": "Invalid input format for numbers"}), 400

      
        # current year rainfall and temperature prediction
        Rainfall = getMahaAnnualRainfall(Year,District)
        Temperature = getMahaTemp(Year,District)
        # current year crop yield
        yield_prediction = yieldPrediction(Year, District, Commodity, Area, Rainfall, Temperature, Soil_color, Fertilizer, Nitrogen, Phosphorus, Potassium, pH)
        # current year crop yield in tonnes
        yield_prediction_tonnes = round(yield_prediction/10,2)
        
        # Gemini In Use
        market_data,goverment_data = geminiInUse(Commodity)

        return jsonify({
            'yieldPrediction': yield_prediction,
            'yieldPredictionTonnes': yield_prediction_tonnes,
            'commodity': Commodity,
            'state': "Maharashtra",
            'district': District,
            'area': Area,
            'rainfall': Rainfall,
            'temperature': Temperature,
            'year': Year,
            'marketData': market_data,
            'governmentData': goverment_data
        })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
