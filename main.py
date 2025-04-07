import tkinter as tk
from tkinter import ttk

def split_part_number(event=None):
    brand = brand_var.get()
    input_code = code_input.get().strip()
    result = ""
    
    formatted_code = input_code.replace("-", "").replace(" ", "").upper()
    
    # Логіка для Jeep, Dodge, Chrysler, Ram
    if brand == "Jeep, Dodge, Chrysler, Ram":
        letter_part = ''.join([ch for ch in formatted_code[::-1] if ch.isalpha()][::-1])
        number_part = formatted_code[:-len(letter_part)]
        if len(letter_part) == 1:
            result = f"{formatted_code} / {number_part} {letter_part}"
        elif len(letter_part) >= 2:
            result = f"{formatted_code} / {number_part} {letter_part}"
    
    # Логіка для Alfa Romeo
    elif brand == "Alfa Romeo":
        letter_part = ''.join([ch for ch in formatted_code[::-1] if ch.isalpha()][::-1])
        number_part = formatted_code[:-len(letter_part)]
        if len(letter_part) == 1:
            result = f"{formatted_code} / {number_part} {letter_part}"
        elif len(letter_part) >= 2:
            result = f"{formatted_code} / {number_part} {letter_part}"
    
    # Логіка для BMW, Mini
    elif brand == "BMW, Mini":
        if len(formatted_code) <= 7:
            result = f"{formatted_code} / {formatted_code[0]} {formatted_code[1:4]} {formatted_code[4:]}"
        elif len(formatted_code) > 7:
            if len(formatted_code) == 11:
                part1 = formatted_code[:4]
                part2 = formatted_code[4:9]
                part3 = formatted_code[9:]
                result = f"{formatted_code} / {part1} {part2}{part3} / {formatted_code[:2]} {formatted_code[2:4]} {formatted_code[4:5]} {formatted_code[5:8]} {formatted_code[8:]}"
    
    # Логіка для Ford, Lincoln, Mercury
    elif brand == "Ford, Lincoln, Mercury":
        part1 = formatted_code[:4]
        remainder = formatted_code[4:]
        middle_part = ''.join([ch for ch in remainder if ch.isdigit()])
        letter_part = ''.join([ch for ch in remainder if ch.isalpha()])
        if middle_part:
            result = f"{formatted_code} / {part1}{middle_part} {letter_part} / {part1} {middle_part} {letter_part}"
        else:
            result = formatted_code
    
    # Логіка для Honda, Acura
    elif brand == "Honda, Acura":
        if len(formatted_code) <= 12:  # Короткий номер
            part1 = formatted_code[:5]  # Перші 5 символів
            part2 = formatted_code[5:8]  # Середня частина (завжди 3 символи)
            part3 = formatted_code[8:]  # Решта
            result = f"{formatted_code} / {part1} {part2} {part3}"
        elif len(formatted_code) > 12:  # Довгий номер
            part1 = formatted_code[:5]  # Перші 5 символів
            part2 = formatted_code[5:8]  # Середня частина (завжди 3 символи)
            # Передостання частина — усе після part2 до початку останньої частини
            for i in range(8, len(formatted_code)):
                if formatted_code[i].isalpha():  # Початок останньої частини
                    part3 = formatted_code[8:i]  # Передостання частина (2+ символів)
                    part4 = formatted_code[i:]  # Остання частина (починається з букви, 2+ символів)
                    break
            result = f"{formatted_code} / {part1}{part2}{part3} {part4} / {part1} {part2} {part3} {part4}"
    
    result_output.config(state="normal")
    result_output.delete("1.0", tk.END)
    result_output.insert("1.0", result)
    result_output.config(state="disabled")

# Головне вікно
root = tk.Tk()
root.title("Розбивка каталожних номерів")
root.geometry("600x400")

# Вибір марки машини
brand_var = tk.StringVar()
brand_dropdown = ttk.Combobox(root, textvariable=brand_var, state="readonly", font=("Arial", 12), width=40)
brand_dropdown['values'] = ["Jeep, Dodge, Chrysler, Ram", "Alfa Romeo", "BMW, Mini", "Ford, Lincoln, Mercury", "Honda, Acura"]
brand_dropdown.pack(pady=10)
brand_dropdown.current(0)

# Поле для введення коду
code_input = tk.Entry(root, width=50, font=("Arial", 12))
code_input.pack(pady=10)

# Додаємо подію для автоматичної розбивки
code_input.bind("<KeyRelease>", split_part_number)

# Поле для виводу результату
result_output = tk.Text(root, width=50, height=3, font=("Arial", 12), wrap="word", state="disabled")
result_output.pack(pady=10)

# Запуск програми
root.mainloop()
