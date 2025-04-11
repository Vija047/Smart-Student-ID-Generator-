# Smart Student ID Generator

A React-based Smart Student ID Generator built for the Unity Internship Assignment. This app captures student information, displays a dynamic ID preview with QR code generation, supports multiple design templates, and allows downloading the ID as a PNG. Built using `@lovable/replit/v0`.

---

##  Features

### 1.  Student Data Form
- **Fields Captured:**
  - Name
  - Roll Number
  - Class & Division (Dropdown)
  - Allergies (Multi-select)
  - Photo Upload (with preview)
  - Rack Number
  - Bus Route Number (Dropdown)
- **Submit Button** triggers the ID generation preview.

### 2.  Smart ID Card Preview
- Displays:
  - All entered student data
  - Uploaded photo
  - QR Code (containing full JSON of student data)
  - Download as PNG button

### 3.  Template Switching
- Dropdown toggle to switch between **two design templates** in real-time.

### 4. (Bonus) Persistent Data
- All generated cards are stored in **localStorage**.
- Users can **view/download previously generated ID cards**.

---

##  Tech Stack

- **ReactJS (18+)**
- **@lovable/replit/v0**
- **Tailwind CSS** for UI
- **qrcode.react** for QR Code generation
- **html-to-image** for downloading the card as a PNG
- **LocalStorage API** for persistent data

---

##  Walkthrough
 **Live Demo**: [https://smart-student-id-generator-eight.vercel.app/](#)  
 **Video Demo**: [https://drive.google.com/file/d/1r8liAKHtmPHpkql37cRrX5c1su4cAGIa/view?usp=sharing](#)  
![image](https://github.com/user-attachments/assets/df7d90b9-ab05-4c8a-a956-064b141dd16f)


---

## 🧠 Thought Process

1. **Component Structure**:
   - Form Component
   - ID Card Preview Component
   - Template Switcher
   - Saved Cards View

2. **State Management**:
   - Used React's `useState` and `useEffect` for state control.
   - Student data stored in state, then synced with localStorage.

3. **Image & QR Handling**:
   - Used `FileReader` for image previews.
   - `qrcode.react` encodes the JSON data from the form into a QR code.

4. **Exporting to PNG**:
   - Used `html-to-image` to convert the card into a downloadable PNG.

5. **Responsive Design**:
   - Tailwind CSS ensured quick styling and responsiveness across devices.

---

## 📝 Instructions to Run

1. **Open the project on Replit or locally**  
2. Fill the form and click **Submit**  
3. Preview the Smart ID Card  
4. Use the **Download** button to save it as PNG  
5. Toggle the **Template Switcher** to explore both designs  
6. View or re-download past cards from history

---

## 📂 Folder Structure (Simplified)

