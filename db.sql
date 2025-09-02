-- db.sql
-- School Directory Table

CREATE TABLE IF NOT EXISTS schools (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact TEXT NOT NULL,
    email_id TEXT NOT NULL,
    board TEXT,       -- CBSE, ICSE, State
    type TEXT,        -- Public, Private
    hostel TEXT,      -- Yes / No
    website TEXT,
    fees NUMERIC,     -- Annual fees
    medium TEXT,      -- e.g., English, Hindi
    level TEXT,       -- e.g., Primary, Secondary
    image TEXT,       -- Store image filename or Supabase storage path
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Optional: Indexes for faster searching
CREATE INDEX IF NOT EXISTS idx_schools_city ON schools(city);
CREATE INDEX IF NOT EXISTS idx_schools_name ON schools(name);
CREATE INDEX IF NOT EXISTS idx_schools_board ON schools(board);


-- Trigger to update 'updated_at' on row modification


INSERT INTO schools 
(name, address, city, state, contact, email_id, board, type, hostel, website, fees, medium, level, image)
VALUES
-- Maharashtra
('St. Xavier High School', 'Churchgate, Marine Drive', 'Mumbai', 'Maharashtra', '9876543210', 'xavier.mumbai@example.com', 'SSC', 'Private', 'Yes', 'http://xaviermumbai.edu.in', 45000.00, 'English', 'SSC', 'xavier_mumbai.jpg'),
('Pune Central College', 'Shivaji Nagar', 'Pune', 'Maharashtra', '9898989898', 'pcc.pune@example.com', 'CBSE', 'Public', 'No', 'http://punecentralcollege.ac.in', 60000.00, 'English', 'UG', 'pcc_pune.jpg'),

-- Delhi
('Delhi Modern Public School', 'Rajouri Garden', 'Delhi', 'Delhi', '9123456780', 'dmps.delhi@example.com', 'CBSE', 'Private', 'Yes', 'http://dmpsdelhi.org', 55000.00, 'English', '12th', 'dmps_delhi.jpg'),
('New Delhi Engineering Institute', 'Hauz Khas', 'New Delhi', 'Delhi', '9345678123', 'ndei.nd@example.com', 'AICTE', 'Private', 'Yes', 'http://ndeind.edu.in', 120000.00, 'English', 'PGC', 'ndeind.jpg'),

-- Karnataka
('National High School', 'Basavanagudi', 'Bengaluru', 'Karnataka', '9988776655', 'nhs.blr@example.com', 'SSLC', 'Private', 'No', 'http://nhsbengaluru.org', 30000.00, 'Kannada', 'SSC', 'nhs_blr.jpg'),
('Mysuru Arts College', 'University Road', 'Mysuru', 'Karnataka', '9090909090', 'mac.mysuru@example.com', 'State Board', 'Public', 'Yes', 'http://mysuruartscollege.ac.in', 80000.00, 'English', 'UG', 'mac_mysuru.jpg'),

-- Tamil Nadu
('Chennai Senior Secondary School', 'T. Nagar', 'Chennai', 'TamilNadu', '9001234567', 'csss.chennai@example.com', 'CBSE', 'Private', 'Yes', 'http://cssschennai.org', 47000.00, 'English', '12th', 'csss_chennai.jpg'),
('Coimbatore Science Institute', 'Race Course Road', 'Coimbatore', 'TamilNadu', '9876501234', 'csi.cbe@example.com', 'AICTE', 'Private', 'Yes', 'http://csi-coimbatore.edu', 110000.00, 'English', 'PGC', 'csi_cbe.jpg'),

-- West Bengal
('Howrah Model School', 'Shibpur', 'Howrah', 'WestBengal', '9654321789', 'hms.howrah@example.com', 'WBBSE', 'Private', 'No', 'http://hmshowrah.in', 32000.00, 'Bengali', 'SSC', 'hms_howrah.jpg'),
('Kolkata Commerce College', 'Park Street', 'Kolkata', 'WestBengal', '9765432109', 'kcc.kolkata@example.com', 'UGC', 'Public', 'Yes', 'http://kolkatacommercecollege.ac.in', 75000.00, 'English', 'UG', 'kcc_kolkata.jpg'),

-- Telangana
('Hyderabad International School', 'Banjara Hills', 'Hyderabad', 'Telangana', '9012345678', 'his.hyd@example.com', 'IB', 'Private', 'Yes', 'http://hydintschool.org', 95000.00, 'English', '12th', 'his_hyd.jpg'),
('Warangal Polytechnic Institute', 'Hanamkonda', 'Warangal', 'Telangana', '9887654321', 'wpi.wgl@example.com', 'AICTE', 'Public', 'No', 'http://warangalpoly.in', 65000.00, 'English', 'UG', 'wpi_wgl.jpg'),

-- Gujarat
('Surat Public School', 'Athwalines', 'Surat', 'Gujarat', '9234567890', 'sps.surat@example.com', 'GSEB', 'Private', 'Yes', 'http://spsurat.edu.in', 28000.00, 'Gujarati', 'SSC', 'sps_surat.jpg'),
('Ahmedabad Engineering College', 'Satellite Road', 'Ahmedabad', 'Gujarat', '9345612780', 'aec.ahd@example.com', 'AICTE', 'Private', 'Yes', 'http://aecahmedabad.in', 115000.00, 'English', 'PGC', 'aec_ahd.jpg'),

-- Rajasthan
('Jaipur National School', 'Vaishali Nagar', 'Jaipur', 'Rajasthan', '9456123780', 'jns.jaipur@example.com', 'RBSE', 'Private', 'No', 'http://jnsjaipur.org', 40000.00, 'Hindi', '12th', 'jns_jaipur.jpg'),
('Udaipur Law College', 'Fatehpura', 'Udaipur', 'Rajasthan', '9567123409', 'ulc.udaipur@example.com', 'UGC', 'Public', 'Yes', 'http://ulcudaipur.in', 90000.00, 'English', 'PGC', 'ulc_udaipur.jpg'),

-- Uttar Pradesh
('Lucknow Convent School', 'Hazratganj', 'Lucknow', 'UttarPradesh', '9345098761', 'lcs.lko@example.com', 'ICSE', 'Private', 'Yes', 'http://lcslucknow.edu', 52000.00, 'English', '12th', 'lcs_lko.jpg'),
('Noida Business Academy', 'Sector 62', 'Noida', 'UttarPradesh', '9876509876', 'nba.noida@example.com', 'UGC', 'Private', 'Yes', 'http://nbanoida.ac.in', 105000.00, 'English', 'PGC', 'nba_noida.jpg');
