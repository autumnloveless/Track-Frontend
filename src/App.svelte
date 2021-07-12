<script>
  import Router from 'svelte-spa-router';
  const {push, pop, replace, link} = Router;
  import Landing from "./routes/Landing.svelte";
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";
  import Login from "./routes/Login.svelte";
  import Logout from "./routes/Logout.svelte";
  import Signup from "./routes/Signup.svelte"
  import ForgotPassword from "./routes/ForgotPassword.svelte"
  import ResetPassword from "./routes/ResetPassword.svelte"
  import Transaction from "./routes/Transaction.svelte";
  import Nav from "./components/Nav.svelte"
  import { SvelteToast } from '@zerodevx/svelte-toast'

  const routes = {
    '/': Landing,
    '/app': Home,
    '/settings': Settings,
    '/login': Login,
    '/signup': Signup,
    '/logout': Logout,
    '/forgot_password': ForgotPassword,
    '/reset_password/:id': ResetPassword,
    '/transactions/:id': Transaction,
    '*': Home,
  }
</script>
<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
</svelte:head>

<div class="all-container">
  <Nav />
  <Router {routes} restoreScrollState={true}/>
  <SvelteToast />
</div>

<style>
  .all-container {
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
</style>