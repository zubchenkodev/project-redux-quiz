import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import Result from "./components/Result";
import Question from "./components/Question";

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        element: <Home/>,
        path: "/"
      },
      {
        element: <Question/>,
        path: "/question/:questionId"
      },
      {
        element: <Result/>,
        path: "/result"
      },
    ]
  }
])



function App() {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
