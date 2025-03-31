import Header from './Header.js'
import Footer from './Footer.js'

export default function Layout (props) {
  return (
    <div className="max-w-4xl mx-auto pt-8 px-6 lg:px-0">

      <Header />

      <div as="main" className="mt-10">
        {props.children}
      </div>

      <Footer />

    </div>
  )
}
