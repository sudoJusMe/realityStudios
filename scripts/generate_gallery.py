import os

image_dir = 'images/plat'
output_file = 'project3.html'

try:
    images = sorted([f for f in os.listdir(image_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))])
except FileNotFoundError:
    exit(1)

rows = [images[i:i + 3] for i in range(0, len(images), 3)]

# Move rows 1-8 (indices 0-7) to the bottom, starting from row 9 (index 8)
rows = rows[8:] + rows[:8]

reordered_images = []
for row in rows:
    reordered_images.extend(reversed(row))

html_head = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Platinum Series | Reality Studios</title>
    <link rel="stylesheet" href="projectStyle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .masonry-container.three-col {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0 !important;
            padding: 0 !important;
            width: 75%; 
            margin: 0 auto !important; 
        }
        
        .masonry-container.three-col .masonry-item {
            border-radius: 0 !important;
            aspect-ratio: 1 / 1;
            width: 100%;
            position: relative;
            transform: none !important; 
            opacity: 1 !important;
            margin: 0 !important;
            overflow: hidden;
        }

        .masonry-container.three-col .masonry-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease;
        }

        .masonry-container.three-col .masonry-item:hover img {
            transform: scale(1.05);
            z-index: 2;
        }

        @media (max-width: 768px) {
            .masonry-container.three-col {
                width: 95%;
                grid-template-columns: repeat(3, 1fr); 
            }
        }
    </style>
</head>
<body>

    <header class="project-header">
        <div class="header-content">
            <h1>Platinum Series</h1>
            <p>Employing high-contrast chiaroscuro lighting and procedural shader development, this series captures the raw elegance of metallic textures. Our methodology prioritized precise rim lighting and atmospheric depth to enhance visual impact. The final imagery demonstrates technical excellence in rendering metallic surfaces with cinematic quality.</p>
        </div>
    </header>

    <main class="masonry-container three-col">
"""

html_footer = """
    </main>

    <script src="projectScript.js"></script>
</body>
</html>
"""

grid_items = ""
for img in reordered_images:
    img_path = f"{image_dir}/{img}"
    grid_items += f"""
        <div class="masonry-item">
            <img src="{img_path}" alt="{img}">
        </div>
"""

with open(output_file, 'w') as f:
    f.write(html_head + grid_items + html_footer)
