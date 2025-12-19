<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <!-- Logo -->
      <RouterLink class="navbar-brand" to="/">
        <img :src="Logo" alt="PeopleCert Logo" class="logo" />
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
            <RouterLink
              v-if="['Administrator'].includes(parsed?.role)"
              class="nav-link active"
              to="/candidateList"
              >Candidates List</RouterLink
            >
          </li>

          <li class="nav-item dropdown ms-3 add25px" v-if="['User', 'Administrator'].includes(parsed?.role)">
            <a
              class="nav-link dropdown-toggle p-0"
              href="#"
              id="cert"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Certificates</a>

            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="profileDropdown">

              <li>
                <RouterLink
                  class="dropdown-item"
                  v-if="['User', 'Administrator'].includes(parsed?.role)"
                  to="/certificateslist"
                  >All Certificates</RouterLink
                >
              </li>

              <li>
                <RouterLink
                  class="dropdown-item"
                  v-if="['User', 'Administrator'].includes(parsed?.role)"
                  to="/myCertificates"
                  >My Certificates</RouterLink
                >
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link active" to="/about">About</RouterLink>
          </li>

          <li v-if="isTokenEmpty" class="nav-item">
            <RouterLink class="nav-link active" to="/login">Login</RouterLink>
          </li>

          <!-- Profile Dropdown -->
          <li v-else class="nav-item dropdown ms-3">
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

            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="profileDropdown"
            >
              <li>
                <RouterLink class="dropdown-item" to="/profile"
                  >Profile Details</RouterLink
                >
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <button class="dropdown-item text-danger" @click="logout">
                  Log Out
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from "../icons/Logo-PC.png";

export default {
  data() {
    return {
      token: localStorage.getItem("token") || "",
      Logo,
      parsed: null, // initialize parsed as null
    };
  },
  created() {
    if (this.token) {
      try {
        const payload = this.token.split(".")[1];
        const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        this.parsed = JSON.parse(decoded);
      } catch (e) {
        console.error("Failed to parse token:", e);
        this.parsed = null;
      }
    }
  },
  computed: {
    isTokenEmpty() {
      return !this.token;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.token = "";
      this.parsed = null;
      this.$router.push("/").then(() => {
        window.location.reload();
      });
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 40px;
}

.profile-icon {
  font-size: 38px;
}

a.show .profile-icon {
  color: #ff3200;
}

.active:active {
  color: #ff3200;
}

.dropdown-menu {
  min-width: 180px;
}

.add25px{
  margin-right: 1vw;
}
</style>
