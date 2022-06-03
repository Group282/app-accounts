<template>
  <div>
    <b-navbar
      sticky-top
      toggleable="lg"
      type="dark"
      variant="dark"
      class="pb-0 pt-0"
    >
      <b-navbar-brand>
        <div class="header-logo p-2 border rounded">WEB 22</div>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="main-menu-item" to="/">Accounts</b-nav-item>
          <b-nav-item class="main-menu-item" to="/about-us">About us</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt />
  </div>
</template>

<style>
.header-logo {
  color: var(--orange);
  cursor: default;
}

.navbar-dark .navbar-nav .main-menu-item a {
  color: white;
  border-bottom: 3px solid;
  border-bottom-color: transparent;
}

.navbar-dark .navbar-nav .main-menu-item a.nuxt-link-exact-active {
  border-bottom: 3px solid;
  border-bottom-color: var(--orange);
}
</style>
