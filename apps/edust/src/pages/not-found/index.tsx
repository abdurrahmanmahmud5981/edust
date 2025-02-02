import { useLocation, useNavigate } from "react-router"
import { Button } from "@/components/ui"
import { LogoEdust } from "@/components"
// import { useAppSelector } from "@/app/hooks"
// import { Roles } from "@/types"
// import { useEffect } from "react"

export const NotFound = () => {
  // const activeMode = useAppSelector(
  //   (state) => state.authentication.profileSwitch.activeMode,
  // )

  const location = useLocation()
  const redirectPath = location.state?.from?.pathname || "/"
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (
  //     activeMode === Roles.USER ||
  //     activeMode === Roles.OWNER ||
  //     activeMode === Roles.EDITOR
  //   ) {
  //     navigate("/")
  //   }
  //   navigate("/")
  // }, [activeMode])

  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <LogoEdust />
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">Oops! Page Not Found!</span>
        <p className="text-center text-muted-foreground">
          It seems like the page you're looking for <br />
          does not exist or might have been removed.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    </div>
  )
}
