<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <!-- Logo -->
      <RouterLink class="navbar-brand" to="/">
        <img :src="Logo" alt="PeopleCert Logo" class="logo">
      </RouterLink>

      <!-- Toggle for mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar links -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-center">
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/certificates">Certificates</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link active" to="/about">About</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link active" to="/login">Login</RouterLink>
          </li>

          <!-- Profile Dropdown -->
          <li class="nav-item dropdown ms-3">
            <a
              class="nav-link dropdown-toggle p-0"
              href="#"
              id="profileDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle profile-icon"></i>
            </a>

            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li>
                <RouterLink class="dropdown-item" to="/profile">Profile Details</RouterLink>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <RouterLink class="dropdown-item text-danger" href="#">Log Out</RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import Logo from '../icons/Logo-PC.png'
</script>

<style scoped>
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo {
  height: 40px;
}

.profile-icon {
  font-size: 38px;
}

a.show .profile-icon {
  color: #FF3200;
}

.active:active{
  color: #FF3200;
}

.dropdown-menu {
  min-width: 180px;
}
</style>