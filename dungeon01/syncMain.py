import os
import shutil
import sys

def copy_overwrite(src, dst):
    if os.path.isdir(src):
        if not os.path.exists(dst):
            os.makedirs(dst)
        items = os.listdir(src)
        for item in items:
            s = os.path.join(src, item)
            d = os.path.join(dst, item)
            if os.path.isdir(s):
                copy_overwrite(s, d)
            else:
                shutil.copy2(s, d)
    else:
        shutil.copy2(src, dst)

def main():

    filePathArray = ['camera','common','framework','globel','modules','tools','Application.ts','GameStart.ts']
    for filePath1 in filePathArray:
        main_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..','diurenmw'))
        source_dir = os.path.join(main_path, 'JavaScripts', filePath1)
        # print(f"source_dir: {source_dir}")
        script_dir = os.path.dirname(os.path.abspath(__file__))
        dest_dir = os.path.abspath(os.path.join(script_dir, 'JavaScripts', filePath1))
        # print(f"dest_dir: {dest_dir}")
        if not os.path.exists(source_dir):
            print(f"源目录不存在: {source_dir}")
            sys.exit(1)
        print(f"正在将 {source_dir} 下的内容复制到 {dest_dir}")
        copy_overwrite(source_dir, dest_dir)
    print("复制完成。")

if __name__ == "__main__":
    main()
