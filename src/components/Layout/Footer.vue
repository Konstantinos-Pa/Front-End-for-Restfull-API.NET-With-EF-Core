<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-row">
        <div class="footer-col">
          <h4>MyWebsite</h4>
          <p>Your trusted learning platform. We help you grow your skills.</p>
        </div>

        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/about">About</RouterLink></li>
            <li><RouterLink to="/certificateslist">Certificates</RouterLink></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Follow Us</h4>
          <div class="social-links">
            <a href="#"><i class="bi bi-facebook"></i></a>
            <a href="#"><i class="bi bi-instagram"></i></a>
            <a href="#"><i class="bi bi-twitter-x"></i></a>
            <a href="#"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">© 2025 MyWebsite — All Rights Reserved</div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  background: #1a1a1a;
  color: #fff;
  padding: 60px 20px;
  box-sizing: border-box;
  text-align: center;
}

.footer-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
}
.footer-col {
  width: 30%;
  min-width: 200px;
  margin-bottom: 30px;
}
.footer-col h4 {
  margin-bottom: 15px;
}
.footer-col ul {
  list-style: none;
  padding: 0;
}
.footer-col ul li {
  margin-bottom: 10px;
}
.footer-col ul li a {
  color: #ccc;
  text-decoration: none;
}
.footer-col ul li a:hover {
  color: #0d6efd;
}
.social-links a {
  margin-right: 10px;
  color: #ccc;
  font-size: 20px;
}
.social-links a:hover {
  color: #0d6efd;
}
.footer-bottom {
  text-align: center;
  margin-top: 40px;
  border-top: 1px solid #333;
  padding-top: 15px;
  color: #888;
}

@media (max-width: 768px) {
  .footer-col {
    width: 45%;
  }
}
@media (max-width: 480px) {
  .footer-col {
    width: 100%;
  }
}

</style>
