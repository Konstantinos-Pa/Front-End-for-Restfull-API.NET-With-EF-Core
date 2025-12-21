<template>
    <div class="Grey-Background">
        <div class="Content-box">
            <div class="flexbox">
                <div class="img-container ">
                    <img :src=Main alt="Business woman using tablet" class="img"></img>
                </div>
                <div class="text-container">
                    <p id="welcome1">Welcome to Our Exam Platform </p>

                    <p id="welcome2">Welcome to our online examination platform, your trusted space for learning,
                        practice, and assessment. Whether you are preparing for an upcoming exam, testing your
                        knowledge, or tracking your progress, our platform is designed to support you every step of the
                        way.</p>

                    <p id="welcome2">Access a wide range of exams, practice questions, and results in a secure and
                        user-friendly environment. Stay focused, stay confident, and take the next step toward achieving
                        your goals.</p>

                    <p id="welcome3">Get started by selecting an exam and begin your journey today.</p>
                </div>
            </div>
        </div>
        <MyCertificateList :flag="true" />
        <h1>
            Most Popular Certificates
        </h1>
        <CertificateList :most="[2, 3]" />

    </div>
</template>

<script setup>
import Main from "../icons/portrait-successful-business-woman-using-digital-tablet.jpg"
import CertificateList from "./CertificateList.vue";
import MyCertificateList from "./MyCertificateList.vue";
let token = localStorage.getItem("token") || "";
</script>

<style scoped>
.Grey-Background {
    background-color: #CBCBCB;
    padding: 5.694vw;
}

.Content-box {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
}

.flexbox {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}

.img-container {
    width: 50vw;
    height: 40vw;
    overflow: hidden;
    flex-shrink: 0;
}

.img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.text-container {
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    flex: 1 1 550px;
    padding: 3.33vw;
}

#welcome1 {
    font-size: 32px;
    font-weight: bold;
}

#welcome2 {
    font-size: 15px;
}

#welcome3 {
    font-size: 24px;
}

h1 {
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 2.5rem;
    /* larger and more readable */
    font-size: 32px;
    font-weight: bold;
    /* matches your button accent color */
    text-align: left;
    /* center on the page */
    margin: 40px 0 20px 0;
    /* space above and below */
    position: relative;
    /* for decorative line */
}
</style>