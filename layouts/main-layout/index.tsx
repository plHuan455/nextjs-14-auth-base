interface Props {
  children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative">
      <main className="relative">{children}</main>
    </div>
  )
}

export default MainLayout
