from rembg import remove
from PIL import Image

def flawless_transparent(input_path, output_path):
    print("Mükemmel şeffaflık işlemi başlatılıyor (Yapay Zeka Destekli)...")
    try:
        input_image = Image.open(input_path)
        output_image = remove(input_image)
        # Resize if desired, but let's keep it exact for perfect clarity
        output_image.thumbnail((256, 256), Image.Resampling.LANCZOS)
        output_image.save(output_path, "PNG")
        print("İşlem başarılı! favicon.png yapay zeka ile şeffaf hale getirildi.")
    except Exception as e:
        print(f"Hata: {e}")

if __name__ == "__main__":
    flawless_transparent("logo.png", "favicon_perfect.png")
