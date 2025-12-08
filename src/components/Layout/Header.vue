<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <a class="navbar-brand fw-bold text-white" href="#">MyWebsite</a>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">About</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Courses</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Certificates</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.header {
  background: #1a1a1a;
  color: white;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

.nav a {
  color: white;
  text-decoration: none;
  margin-left: 25px;
  font-size: 16px;
}

.nav a:hover {
  color: #0d6efd;
}
</style>
