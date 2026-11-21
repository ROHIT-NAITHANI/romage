INSERT INTO hotels (id, name, address, city, country, phone, email)
VALUES
    ('10000000-0000-4000-8000-000000000001', 'Harbor View Hotel', '12 Ocean Drive', 'Miami', 'United States', '+1-305-555-0101', 'hello@harborview.example'),
    ('10000000-0000-4000-8000-000000000002', 'Mountain Lodge', '45 Pine Road', 'Denver', 'United States', '+1-303-555-0142', 'info@mountainlodge.example')
ON CONFLICT (id) DO NOTHING;
