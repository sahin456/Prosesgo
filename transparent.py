from PIL import Image

def make_transparent(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Check if pixel is close to white
            if item[0] > 235 and item[1] > 235 and item[2] > 235:
                # White pixel -> make transparent
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        # Optional: scale down to favicon dimensions (64x64 or 128x128) for a smoother look
        img.thumbnail((256, 256), Image.Resampling.LANCZOS)
        img.save(output_path, "PNG")
        print("Success: favicon.png created.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    make_transparent("logo.png", "favicon.png")
