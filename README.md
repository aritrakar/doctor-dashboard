Demo: https://docdash.netlify.app/docdash/

DevPost: https://devpost.com/software/docdash

# Inspiration

Thousands of people face various kinds of problems (even death) every year due to reasons such as lack of access to good doctors and illegible doctor handwritings. DocDash aims to streamline and digitize the process of connecting patients to the right doctors and strives to ensure that the patients get the required help in time.

# What it does

DocDash (short for Doctor Dashboard) provides a simple, beginner-friendly platform where patients can find the best doctors worldwide and consult them easily. DocDash features encrypted teleconsultation and digital prescriptions combined with an easy-to-use user interface. Patients can easily book appointments with doctors of their choice and also download digital versions of their prescriptions thus saving time, money, paper and lives. DocDash does not collect data such as location and phone numbers and stores all health-related data on secure servers to prevent collection of data by third-parties such as insurance companies.

# How I built it

I built DocDash with an aim to keep it as simple as possible given the time constraints. The application utilizes React.js, Google's Firebase platform and Vonage Video API. Firebase firestore was used for user authentication and management, whereas Firebase Cloud Storage was used for storing digital documents. The project also includes UI frameworks like Material-UI and Airbnb's Lottie. Combining all these parts ensured a fast platform dedicated to serving users quickly. There are two sides that a user can log in to: Doctor and Patient. For either side, DocDash can act as a centralized personal healthcare-management system.

# Challenges I ran into

* Integrating Vonage into the platform turned out to be more challenging than I initially thought it would be and thus I had to resort to a different method of integrating it.
Deciding on a database structure to store the data of both sides and also connect them. 
*Initially I planned to include the Stripe API on the Patient side for making payments, however, due to lack of time was not able to implement it.

# What I learned

I learned to construct the structure a database from scratch, to set up an authentication system using Firebase, to store files on the cloud and retrieve them dynamically.

# What's next for DocDash

There's a lot of scope for improvement for the application. Firstly, the database can be structured in a better way that makes querying and organizing records easier. Secondly, the UI can be improved such that it looks professional. Thirdly, a more thorough implementation of Vonage's other APIs could be looked at. Last, but not the least, mobile versions of the platform could be built using React Native.
