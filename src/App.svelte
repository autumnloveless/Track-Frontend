<script>
  import Router from 'svelte-spa-router';
  const {push, pop, replace, link} = Router;
  import Landing from "./routes/Landing.svelte";
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";
  import Transaction from "./routes/Transaction.svelte";
  import Nav from "./components/Nav.svelte"

  const routes = {
    '/': Landing,
    '/app': Home,
    '/settings': Settings,
    '/transaction/:id': Transaction,
    '*': Home,
}
</script>
<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
</svelte:head>

<Nav />
<Router {routes}/>

<style>
  :global(.capitalize) {
    text-transform:capitalize;
  }
</style>