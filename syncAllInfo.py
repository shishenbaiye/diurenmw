import os
import shutil

# 获取当前脚本所在的文件夹路径
current_folder = os.path.dirname(os.path.abspath(__file__))

# 源文件夹名称
source_folder_name = "diurenmw"

# 目标文件夹列表
target_folders = ["dungeon01"]

# 需要复制的文件夹列表
folders_to_copy = [
    "JavaScripts",
    "UI",
    "node_modules",
    "Character",
    "Materials",
]

# 源文件夹路径
source_folder = os.path.join(current_folder, source_folder_name)

for target_folder in target_folders:
    # 删除目标文件夹下的指定文件夹
    for folder in folders_to_copy:
        folder_path = os.path.join(current_folder, target_folder, folder)
        if os.path.exists(folder_path):
            shutil.rmtree(folder_path)

    # 复制文件夹到目标文件夹
    for folder in folders_to_copy:
        source_path = os.path.join(source_folder, folder)
        target_path = os.path.join(current_folder, target_folder, folder)
        shutil.copytree(source_path, target_path)

print("复制完成！")
