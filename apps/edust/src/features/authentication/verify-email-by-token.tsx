import { useVerifyEmailByTokenMutation } from "@/app/api/v0/auth"
import assets from "@/assets/images"
import { Typography } from "@/components/ui"
import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { BeatLoader } from "react-spinners"
import { toast } from "sonner"

export const VerifyEmailByToken: React.FC = () => {
  const params = useParams()
  const [verify, { isLoading, isError }] = useVerifyEmailByTokenMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (params.token) {
      verify(params.token)
        .unwrap()
        .then((res) => {
          console.log(res)
          if (res?.status) {
            toast.success(res?.message)

            navigate("/auth/login")
          }
        })
        .catch((error) => {
          if (error?.data?.error) {
            toast.error(error?.data?.error)
          }
        })
    }
  }, [navigate, params.token, toast, verify])

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="w-full p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
        <div className="space-y-4 text-center">
          <img src={assets.logoLight} alt="" className="mx-auto" width={250} />
          <div className="space-y-2">
            <Typography variant="h3">Verifying Your Account</Typography>
            {isLoading && <BeatLoader />}
          </div>
          {!isError && <Typography>Working for verification</Typography>}
          {isError && (
            <Typography className="text-red-500">
              Close this tab and Please Try again!
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}
