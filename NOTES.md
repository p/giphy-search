How this works:

- action types - glorified string constants used in the switch statements
  in reducers
- reducers - transform current state to next state. there is one reducer
  per action type
- actions - a level of indirection above reducers. we dispatch actions
  with a particular action type which ends up calling reducer with that
  action type which creates new state
- app
- index - sets up store, adds store middleware, combines reducers,
  instantiates the app

Flow:

user clicks presses n ->
we dispatch next_page action ->
reducer is invoked with next_page action type ->
reducer adds 25 to offset in the state
