import streamlit as st
def inject_lovable_styles():
    st.markdown("""
        <style>
        /* Import Inter font to match modern UI */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        html, body, [class*="st-at"] {
            font-family: 'Inter', sans-serif;
            background-color: #fcfcfd;
        }

        /* Main Container Styling */
        .main {
            background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
        }

        /* Replicating shadcn/ui Cards */
        .stMarkdown div[data-testid="stMarkdownContainer"] .card {
            background: white;
            padding: 24px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            transition: all 0.2s ease-in-out;
        }
        
        .card:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            border-color: #cbd5e1;
        }

        /* Primary Button Styling (Lovable Indigo) */
        div.stButton > button:first-child {
            background-color: #4f46e5;
            color: white;
            border-radius: 8px;
            border: none;
            padding: 10px 20px;
            font-weight: 500;
            width: 100%;
            transition: background 0.2s;
        }

        div.stButton > button:hover {
            background-color: #4338ca;
            color: white;
            border: none;
        }

        /* Sidebar Styling */
        section[data-testid="stSidebar"] {
            background-color: #ffffff;
            border-right: 1px solid #f1f5f9;
        }
        
        /* Metric Styling */
        [data-testid="stMetricValue"] {
            font-size: 28px;
            font-weight: 700;
            color: #1e293b;
        }
        </style>
    """, unsafe_allow_html=True)

inject_lovable_styles()

def draw_referral_card(role, company, user, description):
    st.markdown(f"""
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 700; font-size: 1.1rem; color: #0f172a;">{role}</span>
                <span style="background: #eef2ff; color: #4f46e5; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">{company}</span>
            </div>
            <div style="color: #64748b; font-size: 0.9rem; margin-bottom: 15px;">
                Posted by <b>{user}</b>
            </div>
            <div style="color: #334155; font-size: 0.95rem; line-height: 1.5;">
                {description}
            </div>
        </div>
    """, unsafe_allow_html=True)
import pandas as pd
from supabase import create_client, Client
import pydeck as pdk

url = st.secrets["SUPABASE_URL"]
key = st.secrets["SUPABASE_KEY"]
supabase: Client = create_client(url, key)

st.set_page_config(page_title="CampusMate", layout="wide", page_icon="🎓")

st.markdown("""
    <style>
    .main { background-color: #f9fafb; }
    .stButton>button { border-radius: 10px; background-color: #4f46e5; color: white; border: none; height: 3em; }
    .stButton>button:hover { background-color: #4338ca; border: none; }
    .card { 
        padding: 20px; 
        border-radius: 15px; 
        background: white; 
        border: 1px solid #e5e7eb; 
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }
    .metric-card {
        background: #ffffff;
        padding: 15px;
        border-radius: 10px;
        border-left: 5px solid #4f46e5;
    }
    </style>
    """, unsafe_allow_html=True)

st.sidebar.title("🎓 CampusMate")
st.sidebar.caption("Student-Alumni Coordination Ecosystem")
menu = ["Dashboard", "Career Journey Map", "Referral Marketplace", "Career GPS"]
choice = st.sidebar.radio("Navigate to:", menu)

if choice == "Dashboard":
    st.title("CampusMate Intelligence Dashboard")
    
    col1, col2, col3 = st.columns(3)
    col1.markdown('<div class="metric-card"><b>Active Referrals</b><br><h2>24</h2></div>', unsafe_allow_html=True)
    col2.markdown('<div class="metric-card"><b>Verified Alumni</b><br><h2>1.2k+</h2></div>', unsafe_allow_html=True)
    col3.markdown('<div class="metric-card"><b>Global Chapters</b><br><h2>12</h2></div>', unsafe_allow_html=True)

    st.subheader("📍 Opportunity Heatmap")
    
    heatmap_data = pd.DataFrame({
        'lat': [12.9716, 19.0760, 28.6139, 17.3850, 22.5726],
        'lon': [77.5946, 72.8777, 77.2090, 78.4867, 88.3639],
        'weight': [100, 80, 90, 60, 40]
    })
    
    st.pydeck_chart(pdk.Deck(
        map_style='mapbox://styles/mapbox/light-v9',
        initial_view_state=pdk.ViewState(latitude=20.5937, longitude=78.9629, zoom=4, pitch=40),
        layers=[
            pdk.Layer(
                'HeatmapLayer',
                data=heatmap_data,
                get_position='[lon, lat]',
                get_weight='weight',
                radius_pixels=60,
            ),
        ],
    ))

elif choice == "Career Journey Map":
    st.header("📍 Career Journey Map")

    try:
        response = supabase.table('alumni_paths').select("*").execute()
        path_data = pd.DataFrame(response.data)
    except:
        path_data = pd.DataFrame([])

    if not path_data.empty:
        view_state = pdk.ViewState(latitude=20.0, longitude=78.0, zoom=3.5, pitch=50)
        layer = pdk.Layer(
            "ArcLayer",
            data=path_data,
            get_source_position='[start_lon, start_lat]',
            get_target_position='[end_lon, end_lat]',
            get_source_color=[79, 70, 229, 150],
            get_target_color=[236, 72, 153, 255],
            widths=5,
        )
        st.pydeck_chart(pdk.Deck(layers=[layer], initial_view_state=view_state))
    else:
        st.info("No data available in alumni_paths table.")

elif choice == "Referral Marketplace":
    st.header("💼 Referral Marketplace")

    try:
        res = supabase.table('referrals').select("*").order('created_at', desc=True).execute()
        referrals = res.data
    except:
        referrals = []

    if referrals:
        for ref in referrals:
            st.markdown(f"""
            <div class="card">
                <div style="display: flex; justify-content: space-between;">
                    <h3>{ref['role']}</h3>
                    <span style="color: #4f46e5; font-weight: bold;">{ref['company']}</span>
                </div>
                <p style="color: #6b7280;"><b>Posted by:</b> {ref['posted_by']}</p>
                <p>{ref['description']}</p>
            </div>
            """, unsafe_allow_html=True)
            if st.button("Apply with Intent Note", key=ref['id']):
                st.toast(f"Application sent for {ref['company']}!")
    else:
        st.warning("Marketplace is currently empty.")

elif choice == "Career GPS":
    st.header("🗺️ Career GPS")
    
    col1, col2 = st.columns([1, 1])
    with col1:
        st.markdown('<div class="card">', unsafe_allow_html=True)
        role = st.selectbox("Target Career Path", ["SDE", "Data Science", "Product Management", "UI/UX"])
        skills = st.multiselect("Current Skills", ["Python", "JavaScript", "React", "SQL", "Figma"])
        experience = st.slider("Years of Experience", 0, 4, 0)
        st.markdown('</div>', unsafe_allow_html=True)

    if st.button("Calculate My Route"):
        with col2:
            st.subheader("Your Roadmap")
            st.markdown("""
            - **Phase 1:** Focus on **System Design** and **Cloud Fundamentals**.
            - **Phase 2:** Connect with the **Bengaluru Alumni Chapter**.
            - **Phase 3:** Target 'Mid-sized Startups' for your first pivot.
            """)
            st.success("Analysis complete.")

st.sidebar.markdown("---")
st.sidebar.info("Developed for Google Solution Challenge 2026")
