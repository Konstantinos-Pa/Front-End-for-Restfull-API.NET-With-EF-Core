<template>
  <div class="Grey-Background">
    <div class="Content-box">
        <div class="flexbox">
            <div class="text-container">
                <p id="welcome1">About Us</p>

                <p id="welcome2">Our platform is designed to provide a reliable, secure, and user-friendly online examination experience. We aim to support learners, educators, and institutions by offering a modern solution for conducting exams, assessments, and practice tests with confidence and ease.</p>

                <p id="welcome2">We believe that assessments should be accessible, fair, and efficient. That’s why our system focuses on accuracy, security, and simplicity—allowing users to concentrate on what truly matters: learning and performance.</p>

                <p id="welcome2">With a wide range of exams and assessment tools, our platform helps users prepare effectively, track progress, and achieve their academic or professional goals. For educators and administrators, we offer tools to manage exams, evaluate results, and maintain academic integrity.</p>

                <p id="welcome3">Get started by selecting an exam and begin your journey today.</p>
            </div>
            <div class="img-container ">
                <img :src=About alt="Females looking tablet" class="img"></img>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
  import About from "../icons/high-angle-females-looking-tablet.jpg";
</script>

<style scoped>
    .Grey-Background{
      background-color: #CBCBCB;
      padding: 5.694vw;
    }
    .Content-box{
        background-color: white;
        border-radius: 10px;
        overflow: hidden;
    }
    .flexbox{
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
        padding: 3.61vw;
        object-fit: cover;
        display: block;
    }
    
    .text-container {
        font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
        flex: 1 1 550px;
        padding:3.33vw;
    }

    #welcome1{
        font-size: 32px;
        font-weight: bold;
    }

    #welcome2{
        font-size: 15px;
    }

    #welcome3{
        font-size: 24px;
    }
</style>