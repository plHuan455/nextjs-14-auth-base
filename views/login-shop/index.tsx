import LoginShopController from "./controllers/login-controller"

export default function ViewLoginShop() {
  return (
    <div>
      <div className="container">
        <div className="flex justify-center items-center h-screen supports-[height:100dvh]:h-[100dvh]">
          <div className="w-full max-w-[400px] rounded-lg bg-default py-4 border border-foreground/5">
            <div className="mt-6 px-4 pb-4">
              <LoginShopController />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
