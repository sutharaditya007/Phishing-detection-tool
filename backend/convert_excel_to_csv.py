import pandas as pd
import os

# Define the input and output directories
input_dir = r"E:\phishing-detection-desktop1\backend\datasets"  # Use raw string to avoid escape issues
output_dir = r"E:\phishing-detection-desktop1\backend\datasets\csv"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# List all files in the input directory for debugging
all_files = os.listdir(input_dir)
print("📂 Files in input directory:", all_files)

# Get all .xlsx files
excel_files = [f for f in all_files if f.lower().endswith(".xlsx")]
print("📊 Excel files found:", excel_files)

# Check if there are any Excel files
if not excel_files:
    print("⚠ No Excel files found in the input directory! Check file extensions.")
else:
    for file in excel_files:
        input_path = os.path.join(input_dir, file)
        output_path = os.path.join(output_dir, file.replace(".xlsx", ".csv"))

        try:
            # Read and convert the Excel file
            df = pd.read_excel(input_path, engine="openpyxl")
            df.to_csv(output_path, index=False)
            print(f"✅ Converted: {file} -> {output_path}")
        except Exception as e:
            print(f"❌ Error converting {file}: {e}")

print("🎉 Conversion process completed!")
