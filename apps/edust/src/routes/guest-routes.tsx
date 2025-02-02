import { ComingSoon } from "@/components"
import { InstituteDetails, Institutes, Site } from "@/features"
import Authentication from "@/features/authentication"
import { AboutUs, ContactUs } from "@/pages"
import { Route } from "react-router"

export default (
  <>
    <Route path="/auth">
      <Route path="register" element={<Authentication.Register />} />
      <Route
        path="verify-account/:token"
        element={<Authentication.VerifyEmailByToken />}
      />
      <Route path="login" element={<Authentication.Login />} />
      <Route
        path="forgot-password"
        element={<Authentication.ForgotPassword />}
      />

      <Route
        path="callback/:token"
        element={<Authentication.SocialAuthCallback />}
      />
    </Route>

    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/contact-us" element={<ContactUs />} />
    <Route path="/u/:orgIdOrUsername/site" element={<Site />} />
    <Route path="/institutes" element={<Institutes />} />
    <Route path="/institutes/:id" element={<InstituteDetails />} />

    <Route path="/feedback" element={<ComingSoon />} />
    <Route path="/help-center" element={<ComingSoon />} />
    <Route path="/contact-support" element={<ComingSoon />} />
  </>
)
