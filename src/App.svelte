<script>
  import Router from 'svelte-spa-router';
  const {push, pop, replace, link} = Router;
  import Landing from "./routes/Landing.svelte";
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";
  import Login from "./routes/Login.svelte";
  import Signup from "./routes/Signup.svelte"
  import Transaction from "./routes/Transaction.svelte";
  import Nav from "./components/Nav.svelte"

  const routes = {
    '/': Landing,
    '/app': Home,
    '/settings': Settings,
    '/login': Login,
    '/signup': Signup,
    '/transaction/:id': Transaction,
    '*': Home,
  }
</script>
<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
</svelte:head>

<Nav />
<Router {routes}/>

<style>
  :global(.capitalize) {
    text-transform:capitalize;
  }
  :global(body) {
    overflow: hidden;
  }
</style>