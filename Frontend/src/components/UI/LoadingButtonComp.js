
import LoadingButton from "@mui/lab/LoadingButton";

function LoadingButtonComp(props) {
  return (
    <LoadingButton
    type="submit"
    loading={props.loading}
    fullWidth
    variant={props.variant}
    sx={{
      mt: 3,
      mb: 2,
      bgcolor: `${props.color}.light`,
      "&:hover" : {bgcolor: `${props.color}.dark`},
    }}
    {...props}
  >
    {props.children}
  </LoadingButton>
  )
}

export default LoadingButtonComp