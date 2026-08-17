# Software Requirements Specification

for

**'Ingatkan Teman' Project**

Version 1.0

Prepared by Group KATSPAW

Prepared for Puan Tan Ming Ming

FSKTM, University Putra Malaysia

29th Nov 2025

*Copyright © 1999 by Karl E. Wiegers. Permission is granted to use, modify, and distribute this document.*

---

## Table of Contents

- Table of Contents
- Revision History
- 1. Introduction .......................................................................................................................... 1
  - 1.1 Purpose .......................................................................................................................... 1
  - 1.2 Document Conventions .................................................................................................. 1
  - 1.3 Intended Audience and Reading Suggestions .................................................................. 1
  - 1.4 Product Scope ................................................................................................................ 2
  - 1.5 References ..................................................................................................................... 2
- 2. Overall Description ................................................................................................................ 4
  - 2.1 Product Perspective ....................................................................................................... 4
  - 2.2 Product Functions .......................................................................................................... 4
  - 2.3 User Classes and Characteristics ..................................................................................... 4
  - 2.4 Operating Environment .................................................................................................. 5
  - 2.5 Design and Implementation Constraints .......................................................................... 5
  - 2.6 User Documentation ....................................................................................................... 5
  - 2.7 Assumptions and Dependencies ...................................................................................... 6
- 3. External Interface Requirements ............................................................................................ 7
  - 3.1 User Interfaces ............................................................................................................... 7
  - 3.2 Hardware Interfaces ...................................................................................................... 10
  - 3.3 Software Interfaces ....................................................................................................... 11
  - 3.4 Communications Interfaces ........................................................................................... 12
- 4. System Features ................................................................................................................... 13
  - 4.1 Medication Reminder .................................................................................................... 13
  - 4.2 Medication Inventory Tracker ....................................................................................... 15
  - 4.3 Daily Health Recorder ................................................................................................... 17
  - 4.4 Chit-Chat ...................................................................................................................... 19
  - 4.5 Consulting ..................................................................................................................... 21
  - 4.6 AI Engine ...................................................................................................................... 23
- 5. Other Nonfunctional Requirements ....................................................................................... 26
  - 5.1 Performance Requirements ............................................................................................ 26
  - 5.2 Safety Requirements ...................................................................................................... 27
  - 5.3 Security Requirements ................................................................................................... 29
  - 5.4 Software Quality Attributes ........................................................................................... 31
  - 5.5 Business Rules ............................................................................................................... 33
- 6. Other Requirements .............................................................................................................. 34
- Appendix A: Glossary ................................................................................................................ 36
- Appendix B: Analysis Models ..................................................................................................... 36

---

## Revision History

| Version | Name | Date | Reason For Changes |
|---|---|---|---|
| 1.0 | First Draft | 29.11.2025 | Initial Version |

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document describes the complete requirements set of the **"Ingatkan Teman" mobile application,** version 1.0. This application is designed to support elderly users in managing their daily medication plans, monitoring their health conditions, maintaining emotional well-being, and improving communication with caregivers through an AI-driven role assistant.

This SRS focuses on defining the functional and non-functional requirements of all major modules of the application, including medication reminders, drug inventory trackers, daily health recorders, chat companions, and consultation assistants.

### 1.2 Document Conventions

*This document follows the IEEE SRS standard format. Use the following conventions:*

*Bold text indicates the main functions, module names, roles and sections.*

*Italic text is used for technical terms or descriptions of important concepts.*

*Each functional requirement is uniquely identified in REQ-X.X.X format for reference.*

*If applicable, the priority is divided into* **high (H)**, **medium (M),** *or* **low (L).**

*Placeholder texts such as* **TBD** *represent information determined in the later stages of development.*

### 1.3 Intended Audience and Reading Suggestions

*This document is applicable to the following stakeholders:*

*Developers and engineers: Understand all the necessary system functions, data flows and interfaces.*

**Project Manager:** *Plan development milestones, resources and deliverables.*

**UI/UX designer:** *Design interfaces suitable for the elderly based on functional requirements.*

**Tester:** *Refer to the functional and non-functional requirements for creating test cases.*

**Lecturer/Assessor:** *Evaluate the completeness and correctness of the project.*

*Suggested reading process:*

**Part 1 - Introduction:** *System Overview.*

**Part 2 - General Description:** *Background,* *Users, Environment and Limitations.*

**Section 3 - External Interface Requirements**: *UI, Hardware, and Software Interaction.*

**Part 4 - System Functions:** *Detailed functional Requirements for Each module.*

**Section 5 - Non-Functional Requirements:** *Quality and Performance Expectations.*

### 1.4 Product Scope

*The "Ingatkan Teman" app is designed to address the challenges faced by Malaysia's growing elderly population, including missed medication, difficulty in tracking health readings, social isolation and limited digital literacy.*

*The main goals of this system include:*

*Provide timely medication reminders through supportive artificial intelligence guidance.*

*Maintain accurate tracking of drug inventory to prevent shortages.*

*Record daily health indicators (such as blood pressure, blood sugar, heart rate) through conversational artificial intelligence.*

*Provide emotional support and companionship through friendly AI characters.*

*Provide non-diagnostic counseling and self-care advice as well as structured summaries.*

*This mobile application will enhance the independence, safety and emotional health of elderly users, while reducing the burden on caregivers.*

### 1.5 References

*The following reference materials support the concepts, design principles and standards used in the development of this SRS*

*ISO/IEC 25010:2011 - Software Product Quality Model.*

*WCAG 2.1 - Guidelines for Web Content Accessibility in Interface Design for Seniors*

*Don Norman (2013), Design of Everyday Things - People-Oriented Design Principles.*

*Fisk et al. (2009), Designed for the Elderly - Guidelines for Usability and Accessibility.*

*European Commission (2019), Trustworthy AI Ethics Code - AI Responsibility and Safety.*

*Ian Sommerville (2021), Software Engineering - Fundamentals of SRS and Requirements Engineering.*

*Pressman & Maxim (2020), Software Engineering: The Practitioner's Approach.*

*Abdullah and others. Healthy Aging in Malaysia by 2030 (2024) - The Needs and Challenges of Elderly Care.*

---

## 2. Overall Description

### 2.1 Product Perspective

"Ingatkan Teman" is a newly developed, standalone mobile application designed specifically for elderly users who often struggle with medication adherence, health monitoring, and emotional well-being. The product does not extend or replace an existing system; rather, it introduces an integrated and AI-driven approach to elderly care, combining multiple health and support functions into one unified platform. The system is built around five AI personas, each representing a family member figure, to help users interact more comfortably and intuitively with the application. These personas guide the user through medication reminders, health record management, emotional support conversations, inventory tracking, and general well-being consultation. The application operates as a self-contained system, supported by backend services that handle data storage, AI processing, notifications, and optional caregiver integration. It may also connect to external tools such as map services and Bluetooth health devices for improved accuracy and convenience.

### 2.2 Product Functions

The application offers several major functions that work together to improve elderly users' daily routines and overall well-being. The Medication Reminder helps users record medication schedules, convert prescription photos into structured data, and receive timely, friendly reminders for each dose. The Medication Inventory Tracker maintains an up-to-date count of medicine supplies, notifies users when stocks run low, and assists in finding nearby pharmacies for restocking. The Daily Health Recorder enables conversational health check-ins, allowing elderly users to record vital signs, symptoms, and lifestyle data in a simple and guided format. The Chit-Chat feature provides emotional interaction through a warm, friendly AI persona that engages in casual conversation, reducing loneliness and improving user mood. Lastly, the Consulting feature allows users to express concerns about their physical and mental health, generating structured session summaries and safe, non-diagnostic recommendations. These features combine to form a holistic support system that addresses medication, health monitoring, emotional companionship, and personal guidance.

### 2.3 User Classes and Characteristics

The primary users of the system are elderly individuals who may have limited digital literacy, reduced cognitive abilities, or difficulty managing complex applications. Therefore, the design prioritizes simplicity, large readable text, and friendly AI personas to make interactions more intuitive and less intimidating. A secondary user group includes caregivers or family members who rely on the application to monitor missed doses, view exported health reports, and receive notifications when issues arise. Healthcare professionals may also interact with the system indirectly when reviewing user-generated reports during clinical consultations. Finally, system administrators and developers represent a smaller user group responsible for maintaining the backend systems, AI models, and software updates. The design of the app places greatest priority on supporting the elderly, while ensuring caregivers and healthcare professionals have the necessary tools to oversee user health effectively.

*Refer to figure 2.3 at Appendix B : Analysis Models*

### 2.4 Operating Environment

The "Ingatkan Teman" application will operate primarily on modern Android and iOS smartphones, supporting operating systems such as Android 10 or above and iOS 13 or above. It is designed to run smoothly on typical consumer devices, including those commonly owned by elderly users, which may have moderate processing capabilities. The application may also connect to Bluetooth-enabled medical devices such as blood pressure monitors or glucometers, depending on user preference. Core features such as AI processing, data synchronization, and map-based pharmacy search rely on cloud services and Internet connectivity; however, essential features like viewing medication schedules and marking doses as taken can operate offline, synchronizing data once the device reconnects. The system also relies on mobile operating system notification services such as Firebase Cloud Messaging (Android) and Apple Push Notification Service (iOS) to deliver timely reminders.

### 2.5 Design and Implementation Constraints

The development of the app is influenced by several constraints. The system's reliance on AI-driven features, such as optical character recognition for prescriptions and natural language processing for conversations, requires stable Internet access and consistent backend performance. Elderly users often use older smartphones with limited memory and processing power, meaning the app must remain lightweight, responsive, and energy-efficient. Health-related data must also be handled in accordance with privacy and ethical standards, as outlined in international guidelines for trustworthy and safe AI. The app's design must comply with accessibility standards to ensure readability, ease of navigation, and optional voice assistance for users with visual or motor limitations. Technical constraints include operating system restrictions on background processes and notification scheduling. Additionally, the system architecture must remain modular so developers can easily maintain and expand individual features without disrupting the entire application.

### 2.6 User Documentation

The software will include several forms of user documentation to assist elderly users and caregivers. A digital user manual will explain how to navigate each module, create medication schedules, log health readings, and interact with the AI personas. The app will also contain built-in tutorials and an onboarding walkthrough to guide users through initial setup, ensuring they feel confident using the system from the beginning. A help center or FAQ section will address common issues and questions, while short, easy-to-understand instructions will appear throughout the app whenever users perform new or complex actions. Voice-assisted instructions may also be provided to enhance accessibility for users who prefer auditory guidance.

### 2.7 Assumptions and Dependencies

Several assumptions are made during the development of the system. It is assumed that users own a smartphone and have at least basic knowledge of device operation, such as tapping buttons or reading notifications. The system also assumes that users will grant necessary permissions for notifications, location access, and camera use for prescription scanning. In addition, many AI-powered functions depend on the availability of Internet connectivity. The application depends on third-party services such as map providers for pharmacy location features and Bluetooth device compatibility for health tracking integrations. Caregiver notification features rely on correct configuration by the user and active contact information. Any changes or failures in these external services may affect the functionality of the system.

---

## 3. External Interface Requirements

### 3.1 User Interfaces

"Ingatkan Teman" is a mobile application mainly targeted at elderly users. The concept is very simple: the application should make people feel calm, friendly, and not stressful when using it. We don't want it to look like a "complex system", but rather hope it can help users like a family member.

- To achieve this goal, the application uses artificial intelligence characters to play the role of family members:

**Adik Ahmad, PakCik Firdaus, Dr. Fatimah, Nurse Alia, Adik Aisya, and Encik Amirul.**

Each role is responsible for different functions. They appear in the interface in the form of short text messages, simple animations, and optional voice. This makes the application feel more humanized rather than mechanical.

#### 3.1.1 Overall design principles

**A layout suitable for the elderly:**

The text is large and clear, with moderate spacing, making it easy to read. The buttons are wide and have a moderate spacing. This is helpful for elderly users with weak eyesight or hand tremors to use.

**Clear actions:**

Each screen only displays a few main options. Important operations are always visible in the form of buttons rather than hidden in the menu. Commonly used buttons include:

- Notify Caregiver
- Send SOS
- Call Health Professional
- Add Medicines
- Search for nearby pharmacies

**Multimodal support**

This application does not rely only on text. When necessary, it can use the text-to-speech (TTS) function to read the content aloud. It also uses simple emojis and gentle animations to express tone or emotion. This is particularly practical in the "Chit-Chat" mode, as Aisya will talk to you in a warm and friendly way.

**Immediate feedback**

When a user clicks an important button (for example, the "Taken" button), the application will respond immediately. The voice will send a brief confirmation or encouragement message, and the status in the schedule will also be updated accordingly. This helps users be confident that their operations have been saved.

#### 3.1.2 Main interface and process

**Medication Reminder - Adik Ahmad (Grandson's Assistant)**

This section helps users remember and manage their medications.

- A **photo-taking** interface where users can take pictures of prescriptions or printed medication lists.
- A **review interface** that displays the information read by the application from the photo: drug name, specification, dosage, frequency of administration, start date, and end date, as well as any special remarks. When users check each field, Ahmad will "guide" them with friendly words.
- A **daily schedule** interface lists all medications, their taking frequency and current status, allowing users to easily check the medications they need to take next.

For each predetermined dose, the main buttons are:

- Taken
- Remind Me Later (5min)
- Skip

When it's time to take the medicine, a **notification** will pop up, which contains a simple message like "It's time to take the medicine at 8 a.m." and a button that can directly open the reminder interface.

#### 3.1.3 Pharmaceutical Inventory Tracker - PakCik Firdaus (Inventory Guardian)

This section shows the remaining quantity of medicines for the user and sends a reminder when the medicines are about to run out.

- **Inventory list**, showing the dosage, remaining quantity, expiration date and any storage notes of each medicine.
- **Low inventory dashboard**, focusing on medicines that are about to run out. The screen displays the current quantity of each medicine, the estimated remaining days and the recent usage.
  - The main buttons of the low inventory dashboard include:
    - Add medicines
    - Search for nearby pharmacies
    - Notify the caregiver
    - Export the shopping list
- **Map view**, with thumbtacks marking nearby pharmacies. For each pharmacy, the application can display distance, estimated travel time, and other detailed information, such as contact number and business hours (if this information is available).

#### 3.1.4 Daily Health Recorder - Dr. Fatima and Nurse Alia (Conversational Health Duo)

This function helps users record and track their daily health conditions.

- Dr. Fatima will ask some simple questions in a **conversational consultation style**, such as "How are you feeling today?" Or "Do you have any dizziness or pain?" . If necessary, Nurse Alia will conduct further inquiries. Users can input values such as blood sugar, blood pressure, heart rate, weight, or body temperature, and briefly record symptoms or emotions.
- In addition, **a direct form view** is provided to facilitate users in quickly input data without going through a complete conversation process.
- **Historical records and chart views** can display the changes of various indicators over several days, weeks or months. For each indicator, the application will display the average value, minimum value and maximum value, as well as whether the indicator has improved, deteriorated or remained unchanged. Users or caregivers can view data within a specific time range through filters and date pickers.

#### 3.1.5 Chat - Adik Aisya (Granddaughter Company)

- This part looks like a simple chat app, designed to reduce feelings of loneliness and provide emotional support.
- Aisya's message will appear in the form of a friendly big bubble. She would greet users, ask them how their day was, share little stories and offer encouragement.
- Users can reply by using the **quick reply button**. Common options include:
  - Yes
  - No
  - Tell me more
  - Later
- Users who want to type can also send customized short messages.
- The optional text-to-speech (TTS) feature can read Aisya's messages in a gentle girlish voice, which is very practical for users who have difficulty reading.
- If it is found useful, Aisya will suggest that users enable other functions, such as "Daily Health Record" or "Medication Reminder". Users can choose to accept or ignore these suggestions.

#### 3.1.6 Consultation - Encik Amirul (Calm and reliable Consultant)

This interface can be used when users want to have a more in-depth discussion on health issues.

- Users can initiate a consultation when they need more help.
- **Encik Amirul** will ask about the specific circumstances of the question: what the symptoms are, when they began, the severity of the symptoms, and what the user is worried about. The tone during the consultation was calm, patient, and respectful.
- After the consultation is completed, the application will display a **summary** that includes the main symptoms, key symptoms, timeline, severity, recommended self-care steps, and urgency.
- Users can choose to **export** this summary as a PDF or CSV file and share it with caregivers or doctors.

All interfaces of the application feature soft colors, simple layouts and clear text. Our goal is to always keep "Next" clear and understandable, avoiding users feeling confused or at a loss.

### 3.2 Hardware Interfaces

"Ingatkan Teman" runs on ordinary smartphones and uses the following hardware:

**Touch screen**

All interactions are completed through the touchscreen. The buttons and controls are large in size and spaced apart, making it convenient for elderly users to click easily without very precise finger operations.

**Speaker/Headphones**

Speakers or headphones are used for:

- Play speech synthesis (TTS) voice (for example, in a chat or reminder), as well
- Play the prompt sounds for medication notifications and other alerts (if the sound function is enabled).

**Vibration (haptic feedback)**

- If the device supports it and the user has enabled the vibration function, vibration feedback can also be used for reminders and important alerts. This is very useful for users who may not be able to keep their eyes on the screen all the time.

**Microphone**

For functions that accept voice input, such as daily health records or consultations, the microphone will record the user's voice. After that, these voices can be converted into text and saved to the user's record.

**Optional external health devices**

This application can be used in conjunction with devices such as Bluetooth blood glucose meters, blood pressure monitors or smartwatches. These devices will send readings such as blood sugar, blood pressure or heart rate. Data can be added to the "Daily Health Record" via a mobile phone connection, or files (such as CSV files) can be imported from the clinic.

**Call function**

In some cases, such as when a user's physical condition is extremely poor, the application may suggest calling an emergency contact or a clinic. This application does not make calls automatically. It will only display a one-click dialing button. Users need to use the dialing function of their mobile phones to make the call, and must confirm first before making the call.

### 3.3 Software Interfaces

This section explains how "Ingatkan Teman" works together with other software and services.

**Mobile operating system and local storage**

The app relies on the phone's operating system for notifications, TTS, internet access, and storage. A local database inside the app keeps data such as medication schedules, inventory, health readings, chat histories, consultation summaries, and user settings (language, reminder options, etc.).

**Notification service**

The app uses the OS notification system to set and show reminders. These include medication times, low-stock alerts, and daily health check-ins. When the user taps a notification, the app opens the correct screen (for example, a specific medicine reminder) and records the time.

**Map and pharmacy services**

For inventory and refill support, the app connects to mapping services such as Google Maps, OpenStreetMap or Mapbox. This allows it to:

- show nearby pharmacies on a map,
- display approximate distance and travel time, and
- where available, show extra information like opening hours and contact numbers.

If pharmacy directories or stock APIs are available, the app can ask them for information on where to get certain medicines.

**Connected health devices and clinic exports**

The Daily Health Recorder can receive health data via the phone's existing connections to external devices. It can also import structured files such as CSV reports from clinics and convert them into records that appear correctly in the history and charts.

**Report generation**

Several parts of the app can create reports that users or caregivers can open in normal software. For example:

- the Inventory Tracker can export medication lists and refill shopping lists;
- the Daily Health Recorder can export health history summaries;
- The Consulting module can export consultation summaries with urgency information.

These reports are produced in formats such as PDF or CSV, which are easy to open in standard document or spreadsheet tools.

### 3.4 Communications Interfaces

Most of the important functions of "Ingatkan Teman" can be used directly on the device, but some functions still require communication through the internal communication of the mobile phone or the Internet.

**Local communication and offline use**

This application uses the local notification system of the device to send reminders. When a user replies to a notification, the application will update the user's operation and its time to the local database. For critical tasks such as viewing drug lists and marking medications, this application can function properly even without an Internet connection. All offline operations will be stored on the device and synchronized after the phone is reconnected to the network.

**Internet-based communication**

The following functions require an Internet connection:

- Search for maps and pharmacies in the "Low Inventory Dashboard" (communicate with the map service and (if available) the pharmacy or inventory API);
- Cloud backup and recovery (if this optional feature is enabled);
- When a user frequently misses a dose of medication, the drug inventory is extremely low, the reading exceeds the safe range, or requests to share a consultation summary, the system will send an alert or report to the caregiver or clinic.

**Security and Privacy**

Any personal or health data leaving the device must comply with the security and privacy rules in the proposal. Sensitive information can only be sent with the user's explicit consent. The specific technical methods (such as the encryption or login system used) will be determined later, but the main goal is to prevent unauthorized access and data abuse.

**Battery and network efficiency**

The application should minimize battery and data consumption as much as possible. Map services, external APIs, backup services, etc., will only be requested when it is truly necessary. Background activities should be as few as possible, and non-urgent tasks should be handled as centrally as possible. This is particularly important for elderly users who may be using old mobile phones or have limited data packages.

---

## 4. System Features

The System Features section details what the product does from a user and system perspective. In this section, we break down the major services into logical groups organized by description of system, response sequence and functional requirements. For each feature, we describe its purpose and list the specific, actionable requirements that must be fulfilled for the feature to be considered complete and correct.

### 4.1 Medication Reminder by Adik Ahmad (Grandson Assistant)

#### 4.1.1 Description and Priority

The Medication Reminder module is designed to assist elderly users in managing their medication schedules effectively. Through the caring persona of Adik Ahmad, the app provides a friendly and supportive interface that guides users in entering their medication information, confirms schedules, and sends timely reminders for taking their medicine. Adik Ahmad also offers gentle celebratory feedback after doses are taken, fostering a sense of accomplishment and encouraging adherence to medication regimens. The module incorporates animations, microcopy, and optional audio/gesture to enhance user engagement and reduce anxiety.

**Priority Level : High (H)**

- **Benefit : 9**
  Significantly improves medication adherence and health outcomes for elderly users.
- **Penalty : 8**
  High risk of negative health consequences if users miss doses or do not adhere to their medication schedules.
- **Cost : 5**
  Moderate development and maintenance costs.
- **Risk : 4**
  Risk of user frustration if the reminders are not well-timed or if the interface is not user-friendly, but manageable with proper design.

#### 4.1.2 Stimulus/Response Sequences

> **User Action:** User opens the Medication Reminder section of the app.
> **System Response:** Adik Ahmad appears with a friendly greeting and initiates the AI to extract structured data and their medication details (name, dosage, frequency).

> **User Action:** User takes a photo of the prescription or printed schedule.
> **System Response:** The system analyzes the photo, identifying the medicine name, dosage, frequency, timing, and any special instructions. The system converts this information into structured data.

> **User Action:** User edit and select confirmation to save data.
> **System Response:** The system stores medication details in a secure database once confirmed.

> **User Action:** Time for the user to take medication.
> **System Response:** The system automatically triggers a reminder and brings Adik Ahmad to the forefront. A push notification appears on the user's device.

#### 4.1.3 Functional Requirements

REQ-1.1 : The system shall allow the user to capture or upload an image of a prescription or printed schedule.

REQ-1.2 : The system shall perform OCR and AI parsing to extract structured medication details.

REQ-1.3 : The system shall allow the user to manually edit any extracted field before saving.

REQ-1.4 : The system shall save confirmed medication details to a secure local or cloud database.

REQ-1.5 : The system shall maintain a version history of edited medication details.

REQ-1.6 : The system shall generate medication reminders at scheduled times via local push notifications.

REQ-1.7 : The system shall provide snooze functionality.

REQ-1.8 : The system shall allow the user to mark a medication dose as taken, skipped, or cancelled.

REQ-1.9 : The system shall record timestamp in dose history, deduct inventory of the scheduled quantity and display positive assistant feedback when a dose is marked taken.

REQ-1.10 : The system shall log the action without adjusting inventory if a dose is marked skipped or cancelled.

REQ-1.11 : The system may send alerts to caregivers for missed doses.

REQ-1.12 : The system shall support exporting medication history to a clinic-readable format.

### 4.2 Medication Inventory Tracker by PakCik Firdaus (Inventory Guardian)

#### 4.2.1 Description and Priority

The Medication Inventory Tracker is a backend and UI component designed to ensure a user's medication supply is always accurate and sufficient. It is represented through the character PakCik Firdaus, a friendly and reassuring "uncle" figure who appears in the UI to help users manage their medication stock. He provides guidance, alerts users before supply runs out, and helps connect them with nearby pharmacies when needed.

**Priority Level : High (H)**

- **Benefit : 9**
  Strongly improves adherence, reduces health risks, and increases user trust.
- **Penalty : 9**
  Failure to have this feature could result in users running out of medication, leading to dangerous outcomes.
- **Cost : 5**
  Moderate development cost due to backend logic, UI persona integration, and pharmacy lookup services.
- **Risk : 4**
  The main risks are ensuring accuracy of inventory calculations and location-based suggestions.

#### 4.2.2 Stimulus/Response Sequences

> **User Action:** User adds a new medication to their profile and inputs the current stock.
> **System Response:** PakCik Firdaus appears to save the medication and initial stock with a confirmation.

> **User Action:** User logs a taken dose.
> **System Response:** The system records the dose and automatically deducts one unit from that medication's inventory. The UI updates the stock count seamlessly.

> **User Action:** User navigates to the inventory screen and manually updates the stock count.
> **System Response:** The system updates the total count and recalculates the days remaining.

> **User Action:** User taps the "Find Pharmacies" button from the low-stock alert or inventory screen.
> **System Response:** The system displays a list or map of nearby pharmacies with details.

> **User Action:** The user inventory hits zero or a critical level
> **System Response:** The system sends a higher-priority push notification to alert the user.

> **User Action:** User manually logs a large stock addition
> **System Response:** The system clears all low-stock alerts for that medication and updates the timeline.

#### 4.2.3 Functional Requirements

REQ-2.1: The system shall allow users to create or update an inventory entry when a medication is added via the manual inventory management page.

REQ-2.2: The system shall allow users to be able to manually adjust the quantity of any medicine in inventory. Each adjustment must require a mandatory textual reason and be recorded in an immutable audit log with timestamp and user identifier.

REQ-2.3: The system shall generate a user notification when the available quantity of a medicine is below the user configurable threshold. The threshold must be configurable as either an absolute unit count or a calculated days of supply value.

REQ-2.4: The system shall calculate and display the estimated days remaining until depletion and suggest a recommended refill date based on this forecast.

REQ-2.5: The system shall display a list of all low stock medicines, with each item showing medication name, dosage, current inventory count, estimated days remaining, timestamp of the last administered dose, and the time of the next scheduled dose.

REQ-2.6: The system shall include an interactive, embedded map displaying nearby pharmacies in the Low-Stock Dashboard. The map shall show pharmacy locations as markers with estimated distance and travel time from the user's current location.

REQ-2.7: The system shall allow the generation of an exportable shopping list. The list shall be populated from the low-stock dashboard or report and include necessary quantities for each medicine.

### 4.3 Daily Health Recorder by Dr. Fatimah & Nurse Alia (Conversational Health Duo)

#### 4.3.1 Description and Priority

The Daily Health Recorder utilizes a conversational health monitoring and analytics module featuring a distinctive dual-AI persona approach to facilitate daily health check-ins for elderly users. The primary goal of this feature is to make daily health logging effortless, friendly, and applicable. The system works by having Dr. Fatimah initiates friendly, structured check-ins, which converts the user's natural language input into structured, explicable health records, while Nurse Alia complements this by handling supportive follow-ups and performing basic triage. This dynamic partnership allows the module to generate crucial trend insights and provide timely alerts based on the collected data.

**Priority Level: High (H)**

- **Benefit : 9**
  This is the main health data capture engine of the system. It directly addresses the core objective of helping users by consistently monitoring the vital signs with minimal friction. The high-quality, structured data from this module cater all analytics, reports, and caregiver insights, required forming the foundation for informed self-care and clinical review. Its success is crucial for user retention and perceived app value.
- **Penalty : 9**
  If this feature is unreliable, slow, or confusing, users will slowly start to abandon daily logging and eventually break the consistency of the data stream. The app would lose its primary purpose of "conversational monitoring," reverting to a manual diary that elderly users are less likely to maintain, rendering the analytics and alerting features to become useless.
- **Cost : 8**
  Requires significant development effort: integration of conversational AI/NLP for entity extraction, design of a dual-persona interaction flow, implementation of robust data structuring logic, creation of visualization components for reports, and configuration of complex alerting rules. Ongoing costs include AI inference and data storage.
- **Risk : 8**
  - **NLP Accuracy**: Incorrect extraction of numeric values (e.g., mishearing "140" as "114") could lead to false records and missed alerts.
  - **Conversational Breakdown**: If the AI fails to understand colloquial responses or context, the "friendly" experience becomes frustrating.
  - **Alert Fatigue**: Poorly tuned alert thresholds could generate too many or too few warnings, causing users to ignore critical alerts.

#### 4.3.2 Stimulus/Response Sequences

**1. Getting Conversational Prompt**

> **User Action:** Scheduled check-in time arrives once the user opens the app.
> **System Response:** Dr. Fatimah initiates a conversational prompt, "Good morning! Ready for your morning check-in? How was your fasting blood sugar today?"

**2. Providing Health Reading via Conversation**

> **User Action:** User responds via voice or text - "My blood pressure was 145 over 90 before breakfast."
> **System Response:** Backend NLP extracts entities (BP=145/90, context=before breakfast). Nurse Alia replies, "I've logged 145/90 as your pre-breakfast reading. If it's still elevated tomorrow, would you like some lifestyle tips?" and saves the structured record.

**3. Manual Data Entry & Alert Triggering**

> **User Action:** User manually enters a glucose reading of 18 mmol/L via the quick-add screen.
> **System Response:** System validates the value against rules, triggers a critical alert, and Nurse Alia intervenes, "Critical reading detected. Please contact your clinic immediately. Shall I notify your caregiver?"

**4. Requesting Historical Analysis**

> **User Action:** User or caregiver asks Dr. Fatimah: "How has my weight changed this month?"
> **System Response:** System retrieves weight data for the past 30 days, shows the statistical analysis, and Dr. Fatimah responds, "Your average weight this month is 68.2 kg, showing a stable trend. Your lowest was 67.5 kg on the 15th." while displaying a trend chart.

#### 4.3.3 Functional Requirements

**REQ-3.1 Conversational health Monitoring** : The system shall guide users through daily health check-ins where Dr. Fatimah prompts for health metrics and Nurse Alia provides follow-up guidance. It shall extract structured health data from conversations using NLP with confidence-based validation, support manual/device data entry, and maintain a searchable health timeline.

**REQ-3.2 Health Analytics & Visualization** : The system shall generate visual trends (daily/weekly/monthly charts) with statistical summaries (averages, ranges, trends), automated insights comparing periods, suggesting behavioral correlations and allow export of records as PDF/CSV for caregivers.

**REQ-3.3 Alerting & Safety Management** : The system shall trigger rule-based alerts for abnormal readings with tiered severity levels, providing contextual next steps and optional caregiver/clinic notification through Nurse Alia's persona.

- Three-tier alerts: informational/warning/critical
- Integration with emergency contact systems

### 4.4 Chit-Chat by Adik Aisya (Granddaughter Companion)

#### 4.4.1 Description and Priority

This feature is a proactive and affectionate AI companion persona that is designed to reduce the rate of loneliness and encourage daily interactions of the users with this particular app by engaging through friendly and non-medical conversation. An interaction with a caring granddaughter is simulated by Adik Aisya initiating light chat, remembers personal details (with consent), provides emotional support, and gently nudges users towards health tasks.

**Priority Level: Medium-High (M-H)**

- **Benefit : 8**
  This feature is the primary driver of user engagement and emotional connection to the app. By providing companionship and positive reinforcement, it increases the likelihood that users open the app daily, creating natural opportunities to complete health tasks. It directly addresses the non-functional goal of reducing loneliness, which is a significant value proposition for elderly users.
- **Penalty: 7**
  Without this feature, the app would feel very plain and purely transactional, just like any other health applications. Users might stop checking it regularly. As a result, they might forget or skip their medication reminders or health logs. The app also loses its unique identity without this emotional touch.
- **Cost : 6**
  This feature requires creating a separate persona with its own highly-tuned AI personality, and memory system. The team also needs to make sure it behaves safely, stays in character, and comes with rich UI elements like nice visuals or voice features.
- **Risk : 7**
  - **Uncanny Valley**: If the character doesn't sound natural or consistent, users might find it strange or uncomfortable.
  - **Boundary Violation**: The AI companion might accidentally give advice that sounds medical, or fail to properly raise a serious concern mentioned in the casual conversation.
  - **Memory Mismanagement**: If it forgets something important that the user has shared, or remembers wrongly, it can break the trust and make the users feel uneasy as there will be possibilities that their privacy might be violated.

#### 4.4.2 Stimulus/Response Sequences

**1. Receiving Proactive Engagement**

> **User Action:** User hasn't interacted with the app during configured active hours.
> **System Response:** Adik Aisya sends a proactive message with animation: "Nenek! How is your day?" with quick-reply buttons [Interesting! / Proactive / I'm sad].

**2. Sharing Personal Story with Memory Recall**

> **User Action:** User shares, "I visited the garden today. The roses were blooming."
> **System Response:** Adik Aisya responds with engagement and memory, "Oh, you love roses! Last time you said the red ones are your favorite. Did you take any pictures?" (recalls stored preference).

**3. Expressing Emotional State**

> **User Action:** User types, "I'm feeling lonely today."
> **System Response:** Adik Aisya provides empathetic support, "I'm here with you, Nenek. Would you like to hear a cheerful song, or shall I tell you a funny story about my little brother?"

**4. Receiving Gentle Health Nudge**

> **User Action:** The user is engaged in casual conversation during the medication time window.
> **System Response:** Adik Aisya gently integrates a reminder, "By the way, it's almost 2 PM. Would you like me to remind you to take your afternoon medicine?" with explicit consent prompt.

#### 4.4.3 Functional Requirements

**REQ-4.1 Friendly Companion Engagement** : The system shall provide proactive conversations daily (within configurable hours) using a warm "granddaughter" persona, with memory-based follow-ups and multimodal interaction support.

**REQ-4.2 Emotional Support & Safety** : The system shall provide empathetic listening and emotional support while maintaining strict non-medical boundaries, detecting distress keywords, and escalating appropriately to emergency contacts.

- Response in suitable emotional intelligence
- Response with clear boundary enforcement (no medical or financial advice)

**REQ-4.3 Personalization & Memory Management** : The system shall store and recall personal details with user consent, provide memory management controls.

- Personalized follow-ups using stored memories

### 4.5 Consulting by Encik Amirul (Calm and Trusted Advisor)

#### 4.5.1 Description and Priority

This is a conversational consultant module for discussing health and well-being concerns in a measured and respectful manner. Encik Amirul focuses to help users articulate issues, creates structured session notes with basic analysis and risk flags, and suggests evidence-informed actions or escalations. This is designed to produce shareable reports for caregivers and clinicians, compared to Adik Aisya, Encik Amirul is more known to be formal and analytical.

**Priority Level: Medium (M)**

- **Benefit : 7**
  This feature acts as the middle point between friendly chit-chat and real medical care. It helps users express their worries clearly and turns those conversations into simple notes where they can keep for themselves, as well as for the caregivers and doctors. This feature also adds a significant value where they can obtain clearer summaries of how the user has been feeling over time, not just raw health numbers and data.
- **Penalty: 6**
  Without this feature, users won't have a structured and guided way to talk about health concerns in the app. They might turn to Adik Aisya for medical issues (which isn't solely designed for), or they might not mention their symptoms at all until they get worse and critical. Caregivers would also lose helpful context about the user's emotional and physical well-being over time.
- **Cost : 7**
  Building this feature requires technical work. It needs a more "serious" AI persona that can ask the right questions, organise information properly, and generate clear reports. It also needs a system to identify potential risks in what users say. Overall, it's more complex than simple conversation features as it needs to understand symptoms description and severity.
- **Risk : 8**
  - **Misleading Triage**: If the system misjudges something serious as not urgent, it could delay real medical help. (e.g., marking chest pain as Green)
  - **Over-reliance**: Some people might treat its suggestions as actual medical diagnosis and end up not seeing a doctor when they should.
  - **Privacy Sensitivity**: These conversations can be very personal. If the data is handled poorly or leaks, it would severely damage the users' trust.

#### 4.5.2 Stimulus/Response Sequences

**1. Initiating Consultation Session**

> **User Action:** User explicitly requests to "Talk to Encik Amirul" or mentions a health concern to Adik Aisya that gets escalated.
> **System Response:** Encik Amirul begins the session formally, "Assalamualaikum. I'm here to listen. Please tell me what's been bothering you."

**2. Describing Symptoms for Structured Recording**

> **User Action:** User describes symptoms, "I've had a persistent cough for three days, and I feel more tired than usual."
> **System Response:** Encik Amirul asks clarifying questions, "Thank you. Is there any fever or chest pain? Have you taken any medication for it?" while the system structures a symptom timeline and extracts key entities.

**3. Receiving Session Summary & Recommendations**

> **User Action:** User concludes the consultation.
> **System Response:** System generates and displays a structured report, "Summary: Dry cough for 72 hours, increased fatigue. No fever reported. Suggested: Increase fluid intake, monitor temperature twice daily. If the cough worsens or fever develops, contact the clinic." with options to export or share.

**4. Triggering Emergency Escalation**

> **User Action:** User mentions severe symptoms, "I have sharp chest pain that won't go away."
> **System Response:** System immediately detects high-risk keywords, shows emergency overlay: "EMERGENCY: Chest pain requires immediate medical attention." with one-tap buttons [Call 999] [Call Caregiver] [Show Hospital Directions]. Encik Amirul states, "Please seek help immediately. I've alerted your emergency contacts."

#### 4.5.3 Functional Requirements

**REQ-5.1 Structured Consultation Sessions** : The system shall provide calm and focused conversations where users can describe their health concerns, with clarifying questions to gather details and generate structured consultation records.

**REQ-5.2 Session Summary & Reports** : The system shall generate a structured summary after each session with key findings and a simple risk flag (Green/Amber/Red).

**REQ-5.3 Safe Guidance & Escalation** : The system shall offer general wellness advice (non-diagnostic) and immediately escalate emergency keywords to pre-set contacts.

**REQ-5.4 Health System Integration**: The system shall add consultation notes to the health timeline and create reminders in other modules with user confirmation.

### 4.6 The AI Engine (Backbone of the Application)

#### 4.6.1 Description and Priority

There are five distinct AI personas at the front end (Adik Ahmad, PakCik Firdaus, Dr. Fatimah/Nurse Alia, Adik Aisya, and Encik Amirul), yet they are powered by a single centralized AI Engine at the backend. This AI Engine accepts all user queries, retrieves the relevant context, and dynamically injects specific "System Prompts" to ensure the output matches the tone, style, and boundaries of the active persona. It serves as the logic layer that bridges natural language user input with structured database operations.

**Priority Level : High (H)**

- **Benefit : 9**
  The AI engine powers three out of five main features of this application ( Daily Health Recorder, Chit-Chat, and Consulting) while partially supporting the other two features. Centralizing the logic ensures consistent behavior, easier maintenance of safety guardrails, and reduces the complexity of managing multiple independent models.
- **Penalty : 9**
  If the AI Engine fails or becomes unreachable, the application loses its core value proposition. The "Ingatkan Teman" app would revert to a static, manual input tool, rendering the "Smart" features (OCR, Chat, Advice) non-functional, which would likely lead to immediate user abandonment.
- **Cost : 9**
  Developers will not be training a foundational model from scratch. Instead, they will integrate an existing Large Language Model (LLM) (e.g., via OpenAI API or a self-hosted open-source 8B model on the cloud server). The primary cost lies in "Prompt Engineering," Context Management implementation, and API usage fees/server costs, rather than model training.
- **Risk : 9**
  **Hallucination:** The AI might generate incorrect medical advice or invent nonexistent medication instructions, leading to safety hazards.
  **Latency:** If the model takes too long to process (e.g., >10 seconds), the "conversational flow" breaks.
  **Prompt Injection:** Users might try to "trick" the persona into breaking character or ignoring safety rules.

#### 4.6.2 Stimulus/Response Sequences

**1. Getting OCR Request (Medication Reminder)**

> **User Action:** Scans a physical prescription document using the phone camera.
> **System Response:** (Front-end: displays "Scanning..." animation); (Back-end: AI Engine performs Optical Character Recognition (OCR), extracts specific entities like Medicine Name and Dosage, and returns a JSON object to populate the review screen).

**2. Interaction with AI (Daily health recorder, Chit-chat, Consulting)**

> **User Action:** Sends a text or voice message to a specific persona.
> **System Response:** The Engine retrieves the persona's specific "System Instruction" and the user's recent conversation history, processes the input, and returns a text response in the specific tone.

**3. Deep Analysis and Data Retrieval**

> **User Action:** User asks, "How has my blood pressure been this week?" (Interaction with Dr. Fatimah).
> **System Response:** The Engine interprets the query, fetches the relevant raw data from the database, performs a statistical summary, and generates a natural language insight (e.g., "Your average was 120/80, which is stable").

#### 4.6.3 Functional Requirements

**REQ-6.1 Context and Persona Management** : The system shall dynamically select and inject the appropriate System Prompt (instructions defining tone, role, and boundaries) into the AI context window based on which module the user is currently accessing (e.g., injecting "Grandson Assistant" instructions for Adik Ahmad).

**REQ-6.2 Hybrid Output Formatting (Text & JSON)** : The system shall be capable of generating two types of outputs based on the request type:

1. Natural Language: For conversational responses (Chit-Chat, Consulting).
2. Structured Data (JSON): For functional tasks like OCR extraction or health data logging (extracting "120/80 BP" from a sentence like "My BP is 120 over 80").

**REQ-6.3 Safety and Moderation Layer** : The system shall filter all inputs and outputs through a moderation check. If the input contains distress keywords (e.g., "help," "pain") or requests medical diagnosis, the Engine must override the persona to trigger the Emergency Protocol or a "Non-Medical Disclaimer" response.

**REQ-6.4 Memory and History Retrieval** : The system shall retrieve the last N turns of conversation or relevant Long-Term Memory snippets (e.g., user's name, preferred language) from the database and append them to the current prompt context to ensure continuity in the conversation.

---

## 5. Other Nonfunctional Requirements

### 5.1 Performance Requirements

Given the target demographic of **Elderly Users** (who may suffer from lower *cognitive processing speed* or motor control issues) and the reliance on **AI Personas**, system responsiveness is a critical quality attribute.

**System Latency and Response Time**

**REQ-5.1.1 Application Launch Time**

- **Priority:** (H)
- **Description:** The application shall launch and display the interactive Home Screen in less than 3 seconds (*Cold Start*) and less than 1 second (*Warm Start* or *Background Resume*), regardless of network connectivity.
- **Rationale:** Elderly Users may perceive a slow-loading app as "broken" or "frozen," leading to frustration and abandonment. Quick access is essential for immediate medication checks.

**REQ-5.1.2 UI Interaction Feedback**

- **Priority:** (H)
- **Description:** All interactive UI elements (buttons, navigation tabs) must provide immediate *visual feedback* (e.g., color change, *ripple effect*) within 0.1 seconds (100ms) of input. The subsequent action (e.g., page transition) must complete within 2 seconds.
- **Rationale:** Immediate feedback confirms to the User that their touch was registered, preventing accidental double-taps or confusion common in users with lower *digital literacy*.

**REQ-5.1.3 AI Persona Response Time (Conversational)**

- **Priority:** (H)
- **Description:** When interacting with the **Chit-Chat** module (**Adik Aisya**) or **Consulting** module (**Encik Amirul**), the system must display a *typing animation* or "thinking" state within 0.5 seconds. The final text response must be generated and displayed within 10 seconds.
- **Rationale:** To maintain the illusion of a "companion," the conversation must feel natural. A *latency* longer than 10 seconds breaks the persona immersion and causes user disengagement.

**Functional Processing Speeds**

**REQ-5.1.4 Optical Character Recognition (OCR) Processing**

- **Priority:** (M)
- **Description:** The **Medication Reminder** module's *text extraction* feature (converting a photo of a prescription to structured data) must complete the analysis and display the verification screen in **less than 10 seconds** over a standard 4G/Wi-Fi connection.
- **Rationale:** Users holding a phone camera may have unsteady hands. Rapid processing reduces the time they need to hold the device steady and maintains the workflow momentum.

**REQ-5.1.5 Emergency & Notification Latency**

- **Priority:** (H)
- **Description:** Medication Reminder *push notifications* must trigger within 30 seconds of the scheduled time. Emergency escalation messages (*SMS/Email*) to **Caregivers** (via the **Consulting** module) must be dispatched within **30 seconds** of the trigger event.
- **Rationale:** Timeliness is safety-critical. Significant delays are unacceptable for emergency escalation or strictly timed medication regimens.

**REQ-5.1.6 Database Transactions**

- **Priority:** (H)
- **Description:** Standard *CRUD operations* (e.g., logging a "Taken" dose) must be confirmed to the User in **less than 1 second**. *Bulk operations* (e.g., generating monthly reports) must complete in **less than 10 seconds**.
- **Rationale:** Users must feel confident that their health data has been saved instantly without needing to wait for confirmation.

**Resource Usage and Reliability**

**REQ-5.1.7 Low-Resource Optimization (Thin Client Architecture)**

- **Priority:** (M)
- **Description:** The application *binary size* (APK) should not exceed **50MB**. The app shall offload heavy computation (*OCR*, *NLP*) to the cloud server to minimize *CPU usage* and battery drain on the client device.
- **Rationale:** The target demographic often utilizes older or budget-friendly mobile devices with limited local storage and processing power.

**REQ-5.1.8 Offline Data Synchronization**

- **Priority:** (H)
- **Description:** When the device regains internet connectivity after being offline, local data (e.g., medication logs) must *synchronize* with the cloud database in the background within **30 seconds** without interrupting the User's current activity.
- **Rationale:** Ensures **Caregivers** have up-to-date *adherence data* without requiring the **Elderly User** to manually "refresh" the app.

### 5.2 Safety Requirements

This section specifies safeguards to prevent *loss, damage, or harm* (physical or psychological) to the **Elderly User**.

**AI Constraints and Risk Mitigation**

**REQ-5.2.1 Non-Medical Device Disclaimer**

- **Priority:** (H)
- **Description:** The system must clearly display a *disclaimer* upon first launch and within the **Consulting** (**Encik Amirul**) interface stating that the application is "Not a medical diagnostic tool". The AI Personas shall be programmed with a *system prompt* that strictly forbids them from providing medical diagnoses or altering prescription dosages without clinician input.
- **Rationale:** Prevents **Users** from replacing professional medical advice with AI suggestions, mitigating the risk of untreated conditions or improper self-medication.

**REQ-5.2.2 Hallucination and Content Moderation**

- **Priority:** (H)
- **Description:** The **AI Module** must utilize a *content moderation layer* or *confidence scoring threshold*. If the AI generates information related to medication dosage or symptoms with low confidence, it must fall back to a "safe response" (e.g., "I am not sure, please check with your doctor") rather than guessing.
- **Rationale:** AI models can "hallucinate" facts. In a healthcare context, a hallucinated drug interaction or dosage could result in severe physical harm or overdose.

**REQ-5.2.3 Prevention of Emotional Dependency**

- **Priority:** (M)
- **Description:** The **Chit-Chat** module (**Adik Aisya**) shall include *engagement limits* or scripted nudges that encourage real-world social interaction (e.g., "Have you told your real granddaughter about this?"). The AI must never claim to be a sentient human being or a replacement for family members.
- **Rationale:** Vulnerable **Elderly Users** may develop unhealthy *parasocial attachments* to the AI, potentially leading to social isolation or ignoring real-life caregivers.

**REQ-5.2.4 Distress Detection and Escalation**

- **Priority:** (H)
- **Description:** The **Conversational Modules** must employ *Natural Language Processing (NLP)* to detect *distress keywords* (e.g., "chest pain," "suicide," "fell down," "bleeding"). Upon detection, the system must immediately cease the persona roleplay, display large **Emergency Instructions**, and offer a one-tap button to call pre-configured *Emergency Contacts*.
- **Rationale:** A user experiencing a medical emergency (like a stroke) might try to "tell" the app. If the AI responds with casual chit-chat, it delays critical medical intervention.

**Operational and Data Safety**

**REQ-5.2.5 Data Persistence and Restore**

- **Priority:** (H)
- **Description:** The system must maintain an automatic *cloud backup* of the **Medication Schedule** and **Inventory** data. In the event of device loss or corruption, the system must be able to *restore* critical health data upon re-authentication.
- **Rationale:** Loss of the medication schedule could cause the user to miss doses (non-adherence), leading to health deterioration.

**REQ-5.2.6 Critical Action Confirmation**

- **Priority:** (H)
- **Description:** Any action that modifies the **Medication Schedule** (deleting a medicine, changing frequency) or deletes **Health History** must require an explicit *secondary confirmation* (e.g., "Are you sure you want to delete this medicine?") from the **User**.
- **Rationale:** Prevents accidental deletion of life-critical data due to motor control issues (tremors) common in the elderly demographic.

**External Policies and Regulations**

The system design and safety measures must adhere to the following regulations:

- **Personal Data Protection Act 2010 (PDPA) [Malaysia]:** The system must ensure the integrity of personal health data to prevent harm arising from data leaks or unauthorized manipulation.
- **Medical Device Act 2012 [Malaysia]:** To avoid classification as an unregulated medical device, the software must strictly adhere to the "wellness and reminder" scope and must not perform automated diagnostic interpretation of vital signs.
- **Ethics Guidelines for Trustworthy AI:** The AI design must respect human autonomy and prevent harm, ensuring the user retains the final decision-making power regarding their health.

### 5.3 Security Requirements

This section defines the measures required to protect the **User's** privacy, medical records, and interaction history.

**Data Protection and Privacy**

**REQ-5.3.1 Data Encryption (At Rest and In Transit)**

- **Priority:** (H)
- **Description:** All sensitive user data, including **Medical Records** and **AI Chat Logs**, must be encrypted using **AES-256** when stored in the local database or cloud server. All data transmission between the client app and the server must occur over an encrypted channel using **TLS 1.3** (Transport Layer Security).
- **Rationale:** Prevents unauthorized access to health data (PHI) in the event of device theft or network interception ("Man-in-the-Middle" attacks).

**REQ-5.3.2 AI Data Anonymization**

- **Priority:** (H)
- **Description:** Before sending any user input to the **AI Processing Engine** (LLM), the system must sanitize the data by removing *Personally Identifiable Information (PII)* such as the user's full name, NRIC, or phone number.
- **Rationale:** Ensures that third-party AI models or logs do not retain sensitive personal details, effectively decoupling the health query from the user's identity.

**Authentication and Access Control**

**REQ-5.3.3 Simplified Biometric Authentication**

- **Priority:** (M)
- **Description:** To balance security with accessibility for the elderly, the app shall support *Biometric Login* (Fingerprint or Face Unlock) using the device's native hardware keystore. The system should maintain a *persistent login session* to minimize the need for frequent password entry.
- **Rationale:** Elderly users often struggle to remember complex passwords; biometric authentication provides high security with low cognitive load.

**REQ-5.3.4 Caregiver Access Control (RBAC)**

- **Priority:** (H)
- **Description:** Access to the user's data by a **Caregiver** or **Clinician** must be governed by a *Role-Based Access Control (RBAC)* mechanism. The **Elderly User** must grant explicit, revocable permission (via a pairing code or link) before any third party can view their adherence history.
- **Rationale:** Protects user autonomy and prevents unauthorized surveillance, ensuring data sharing is consensual.

**External Standards and Regulations**

- **Personal Data Protection Act 2010 (PDPA) [Malaysia]:** The system's security architecture must comply with the *Security Principle* of the PDPA, requiring practical steps to protect personal data from loss, misuse, or unauthorized access.
- **OWASP Mobile Top 10:** The development team shall adhere to the Open Web Application Security Project (OWASP) guidelines to prevent common vulnerabilities such as Insecure Data Storage and Extraneous Functionality.

### 5.4 Software Quality Attributes

This section defines the additional quality characteristics required to ensure the system is viable for elderly users and maintainable by the development team.

**Relative Preference:** Usability and Reliability are the highest priority attributes. The design philosophy prioritizes *Ease of Use* (walk-up-and-use) over *Ease of Learning* (power features), as the target audience may struggle with retaining complex interaction patterns.

**Usability (accessibility)**

**REQ-5.4.1 Accessibility Standards Compliance**

- **Priority:** (H)
- **Description:** The application UI must adhere to **WCAG 2.1 Level AA** standards. Specifically, text must maintain a minimum contrast ratio of **4.5:1**, and all interactive touch targets (buttons) must have a minimum size of **48x48 dp** to accommodate reduced motor control.
- **Rationale:** Elderly users often experience visual impairments (presbyopia) and decreased manual dexterity.

**REQ-5.4.2 Interface Simplicity (Cognitive Load)**

- **Priority:** (H)
- **Description:** The system shall enforce a "One Primary Action per Screen" design rule. Navigation depth should not exceed **3 levels** from the Home Screen to any critical feature (Medication, Emergency, Chat).
- **Rationale:** Reduces cognitive load and prevents the user from getting "lost" in deep menus.

**Reliability and Availability**

**REQ-5.4.3 Availability and Uptime**

- **Priority:** (H)
- **Description:** The backend system (AI Engine and Database) shall operate with **99.0% uptime** during waking hours (6:00 AM - 10:00 PM). Scheduled maintenance must be announced via in-app notification at least **24 hours** in advance.
- **Rationale:** Users rely on the app for daily medication routines; unexpected downtime creates anxiety and potential health risks.

**REQ-5.4.4 Fault Tolerance (Graceful Degradation)**

- **Priority:** (H)
- **Description:** If the central server or AI Engine becomes unreachable, the application must not crash. Instead, it must switch to **"Offline Mode,"** allowing read-access to the locally cached Medication Schedule and Emergency Contacts, while temporarily disabling the Chat and Consulting features.
- **Rationale:** A connection failure should never prevent a user from seeing what medicine they need to take.

**REQ-5.4.5 Correctness (AI Hallucination Control)**

- **Priority:** (H)
- **Description:** The AI Engine shall prioritize **Correctness** over **Creativity**. In the **Consulting** module, the system must utilize a *Retrieval-Augmented Generation (RAG)* approach or strict system prompting to ensure advice is grounded in verified general health guidelines, rather than generative fabrication.
- **Rationale:** Misleading health information can have severe consequences for the user's well-being.

**Maintainability and Portability**

**REQ-5.4.6 Portability (Cross-Platform)**

- **Priority:** (M)
- **Description:** The application shall be developed using a cross-platform framework (**Flutter**) and must function correctly on **Android 10+** and **iOS 15+** devices without requiring separate codebases for core logic.
- **Rationale:** Ensures broad reach across the diverse devices owned by the elderly population while minimizing development effort.

**REQ-5.4.7 Maintainability (Modularity)**

- **Priority:** (M)
- **Description:** The codebase must be structured into distinct modules (UI, Logic/Bloc, Data/Repository). Core functions, specifically the **Medication Notification Scheduler**, must be covered by **Unit Tests** with at least **70% code coverage**.
- **Rationale:** Facilitates future updates and bug fixes by the student team without breaking existing critical functionality.

### 5.5 Business Rules

This section defines the operating principles and constraints that govern the system's logic and user authority.

**BR-01: Consent-Based Data Sharing**

- **Description:** The **Elderly User** is the sole owner of their health data. A **Caregiver** or **Clinician** cannot view the user's medication history, adherence logs, or consultation notes unless the Elderly User has explicitly granted permission via a secure pairing mechanism (e.g., OTP or QR code scan).
- **Enforcement:** The system must check for a valid "active consent token" before returning any data to a Caregiver interface.

**BR-02: Non-Diagnostic AI Policy**

- **Description:** The AI Personas (Dr. Fatimah, Nurse Alia, Encik Amirul) are strictly prohibited from providing definitive medical diagnoses or instructing users to alter their prescribed medication dosage.
- **Enforcement:** If a user asks for a diagnosis, the AI must strictly output a disclaimer and redirect the user to a certified healthcare professional or the "Consulting" module for general advice only.

**BR-03: Atomic Inventory Deduction**

- **Description:** The subtraction of medication stock must occur strictly *after* the user confirms the "Taken" action. A "Skip" or "Snooze" action must not affect the inventory count.
- **Enforcement:** The formula `Current_Stock = Current_Stock - Dose_Strength` must be executed as an atomic database transaction to prevent race conditions or negative inventory values.

**BR-04: Emergency Escalation Hierarchy**

- **Description:** In the event of a detected emergency (via distress keywords or panic button), the system must prioritize communication in the following order:
  1. Display immediate self-help/emergency instructions on screen.
  2. Prompt "One-Tap Call" to Emergency Services (999).
  3. Notify the registered **Caregiver** (if consent is active).
- **Enforcement:** The system overrides any active conversational persona to display the Emergency UI immediately.

**BR-05: Offline Operational Continuity**

- **Description:** The lack of internet connectivity must not prevent the critical business function of "Taking Medication."
- **Enforcement:** The system must allow the creation of "Taken" logs locally and queue them for synchronization. The strict enforcement of "Online Only" is prohibited for core features.

---

## 6. Other Requirements

This section defines specific constraints regarding data persistence, localization, and legal compliance not covered in previous sections.

### 6.1 Internationalization and Localization (i18n)

**REQ-6.1.1 Dual-Language Support**

- **Description:** The system shall provide full user interface and content support for **English (US/UK)** and **Bahasa Melayu (Malaysia)**.
- **Rationale:** To accommodate the diverse linguistic preference of the Malaysian elderly demographic.

**REQ-6.1.2 Cultural Context Adaptation**

- **Description:** The **AI Personas** and **UI Microcopy** must adapt honorifics based on the selected language and user profile.
  - *English:* Uses neutral/polite terms (e.g., "Grandpa/Grandma," "Mr./Mrs.").
  - *Bahasa Melayu:* Uses culturally appropriate honorifics (e.g., "Datuk," "Nenek," "Pak Cik," "Mak Cik").
- **Rationale:** Cultural respect is essential for building trust with elderly users in the local context.

**REQ-6.1.3 Dynamic Language Switching**

- **Description:** The user shall be able to toggle between languages via the "Settings" menu. The application must update all text strings and AI response templates immediately without requiring a restart.

### 6.2 Database and Persistence Requirements

**REQ-6.2.1 Hybrid Database Architecture**

- **Description:** The system must implement a **Local-First** database architecture (e.g., SQLite or Hive) to store the *Medication Schedule*, *Inventory Logs*, and *Emergency Contacts* on the device. This local instance acts as the "source of truth" when offline.
- **Rationale:** Ensures the application remains functional in areas with poor internet connectivity.

**REQ-6.2.2 Cloud Synchronization**

- **Description:** The system shall utilize a real-time cloud database (e.g., Firebase Firestore or PostgreSQL) to back up user data. Synchronization triggers must occur automatically upon data modification (CRUD) when a network connection is available.

### 6.3 Legal and Licensing Requirements

**REQ-6.3.1 Third-Party API Compliance**

- **Description:** The application must strictly adhere to the *Terms of Service* of any third-party APIs used (e.g., OpenAI for the AI Engine, Google Maps API for Pharmacy Locator). The "About" page must include required attributions for open-source libraries.

**REQ-6.3.2 Intellectual Property (Student Project)**

- **Description:** As a university course project, the intellectual property rights and distribution policies shall align with **Universiti Putra Malaysia (UPM)** guidelines for undergraduate coursework submissions.

### 6.4 Reuse Objectives

**REQ-6.4.1 Decoupled AI Persona Engine**

- **Description:** The backend **AI Engine** logic must be decoupled from the UI layer. It should be designed as a standalone module/service that accepts a "Persona Configuration" and "User Input" and returns a response.
- **Rationale:** This allows the AI logic to be reused in future projects (e.g., a mental health app or a different reminder system) without rewriting the core prompt engineering logic.

**REQ-6.4.2 Reusable Accessibility Widgets**

- **Description:** Custom UI components designed for elderly accessibility (e.g., *HighContrastButton*, *LargeTextCard*) shall be implemented as a shared component library.
- **Rationale:** Promotes code reusability and consistent styling across all application features.

---

## Appendix A: Glossary

| Jargons / Acronyms / Abbreviations | Meaning / Description |
|---|---|
| CRUD | Create, Read, Update, Delete |
| OCR | Optical Character Recognition |
| NLP | Natural Language Processing |
| TTS | Text-to-Speech |
| SOS | Emergency signal |
| APIs | Application Programming Interfaces |

---

## Appendix B: Analysis Models

**Figure 2.3 : General UseCase UML Diagram of the System.**

*(The original document contains a UML use case diagram with the following actors and use cases:)*

**Actor: Elderly**
- Enter medication schedule
- Scan prescription
- Receive medication reminders
- View medication history
- Receive low-stock alerts
- Record daily health data
- Chat with AI companion
- Perform conversational health check-ins
- Request consultation with Cik Amirul
- View consultation summary
- View Health Reports

**Actor: Healthcare Professional**
- View Health Reports
- Provide feedback to elderly

**Actor: Caregiver**
- Receive missed-dose notifications
- Receive low-stock notifications
- View elderly user's health reports
- Export reports
- Monitor daily health entries
- Manage emergency contact actions
- (connects to "View medication history" shared with Elderly)

**Actor: System Administrator**
- Maintain backend services
- Update AI models
- Manage data storage and security
- Perform system backup and restore
- Monitor system performance
- Manage user accounts
