import streamlit as st
import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore, auth
import plotly.express as px
import pydeck as pdk

if not firebase_admin._apps:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred)

db = firestore.client()

st.set_page_config(page_title="Campus Mitra", layout="wide", page_icon="🎓")

st.markdown("""
    <style>
    .main { background-color: #f8f9fa; }
    .stButton>button { border-radius: 8px; width: 100%; background-color: #4F46E5; color: white; }
    .card { padding: 1.5rem; border-radius: 12px; background: white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 1rem; }
    </style>
    """, unsafe_allow_html=True)

if 'user' not in st.session_state:
    st.session_state.user = None

st.sidebar.title("🚀 Campus Mitra")
menu = ["Dashboard", "Career Journey Map", "Referral Marketplace", "Career GPS", "Alumni Office Hours"]
choice = st.sidebar.radio("Navigate", menu)

def career_journey_map():
    st.header("📍 Career Journey Map")
    st.caption("Visualizing alumni growth from first job to current role") [cite: 6, 7]
    
    map_data = pd.DataFrame({
        'alumni': ['Kanak', 'Rahul', 'Sneha'],
        'lat': [26.9124, 12.9716, 1.3521], 
        'lon': [75.7873, 77.5946, 103.8198],
        'stage': ['First Job', 'Current Role', 'International']
    })
    
    view_state = pdk.ViewState(latitude=20.5937, longitude=78.9629, zoom=4, pitch=50)
    
    layer = pdk.Layer(
        "ArcLayer",
        data=map_data,
        get_source_position='[75.7873, 26.9124]',
        get_target_position='[77.5946, 12.9716]',
        get_source_color=[79, 70, 229, 120],
        get_target_color=[244, 63, 94, 255],
        widths=5,
    )
    
    st.pydeck_chart(pdk.Deck(layers=[layer], initial_view_state=view_state))
    st.info("💡 Click on a route to view the 'Turning Point' stories behind the transition.") [cite: 9, 61]

def referral_marketplace():
    st.header("💼 Referral Marketplace") [cite: 44, 81]
    st.write("Apply with a short intent note to verified alumni opportunities.") [cite: 46]
    
    referrals = db.collection('referrals').stream()
    
    cols = st.columns(2)
    for i, ref in enumerate(referrals):
        data = ref.to_dict()
        with cols[i % 2]:
            st.markdown(f"""
            <div class="card">
                <h3>{data['role']} @ {data['company']}</h3>
                <p><b>Posted by:</b> {data['alumni_name']} ({data['batch']})</p>
                <p>{data['description'][:100]}...</p>
            </div>
            """, unsafe_allow_html=True)
            if st.button(f"Request Referral for {data['company']}", key=ref.id):
                st.success("Referral request sent! You can track status in your profile.") [cite: 47]

def career_gps():
    st.header("🗺️ Career GPS") [cite: 21, 80]
    st.write("AI-driven path recommendation based on alumni journeys.") [cite: 23]
    
    col1, col2 = st.columns([1, 2])
    with col1:
        skills = st.multiselect("Your Skills", ["Python", "React", "SQL", "Cloud", "UI/UX"]) [cite: 22]
        target = st.selectbox("Target Role", ["SDE", "Data Scientist", "Product Manager"])
        if st.button("Generate My Path"):
            with col2:
                st.subheader("Your Recommended Path")
                st.markdown("""
                - **Step 1:** Learn **System Design** (Common gap for SDE) [cite: 50]
                - **Step 2:** Join the **Bengaluru City Chapter** [cite: 33]
                - **Step 3:** Connect with **3 Mentors** who moved from Core to Software [cite: 24]
                """)

if choice == "Dashboard":
    st.title("Welcome to Campus Mitra")
    st.write("Connecting students and alumni through real-world data and impact.")
    
    st.subheader("Opportunity Heatmap (India)") [cite: 10, 79]
    heatmap_data = pd.DataFrame({
        'lat': [12.9716, 19.0760, 28.6139],
        'lon': [77.5946, 72.8777, 77.2090],
        'jobs': [150, 85, 120]
    })
    st.map(heatmap_data) [cite: 11]

elif choice == "Career Journey Map":
    career_journey_map()

elif choice == "Referral Marketplace":
    referral_marketplace()

elif choice == "Career GPS":
    career_gps()

elif choice == "Alumni Office Hours":
    st.header("🎙️ Alumni Office Hours") [cite: 40, 82]
    st.write("Weekly live Q&A sessions on career switches and interview prep.") [cite: 41, 42]
    st.info("Check the 'Open for Guidance' badge on alumni profiles for instant help.") [cite: 74, 75]
