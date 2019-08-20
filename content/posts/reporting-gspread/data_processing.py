# data_processing.py
import pandas as pd

def get_data():
    """ Gets data. Returns a pandas df """
    df = pd.read_json('https://data.cityofnewyork.us/resource/qiz3-axqb.json')
    return df
    
def clean_data(df):
    """ Cleans data. Returns a pandas df """
	
    df = df.copy()
    
    # Let's drop some columns that we won't use
    drop_cols = [col for col in df.columns if col.startswith(':')]
    drop_cols.append('location')
    df.drop(drop_cols, axis=1, inplace=True)

    # Looks like the street names need to be stripped
    for col in ['cross_street_name', 'off_street_name', 'on_street_name']:
        df[col] = df[col].str.strip()
        
    # Create lat,long col
    df['coordinates'] = df['latitude'].astype(str) + ', ' + df['longitude'].astype(str)
    # drop missing values
    df['coordinates'].replace('nan, nan', '', inplace=True)
        
    return df

def etl():
    """ Main function. Gets and cleans data. Returns a pandas df """
    df = get_data()
    df = clean_data(df)
    return df
    
    
if __name__ == '__main__':
    df = etl()
    print(df.head())
    df.to_pickle('data.pkl')