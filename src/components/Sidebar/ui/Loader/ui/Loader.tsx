import ContentLoader from "react-content-loader"
import type { IContentLoaderProps } from "react-content-loader"

const Loader = (props: IContentLoaderProps) => (
  <ContentLoader 
  speed={3}
  width={230}
  height={100}
  viewBox="0 0 230 100"
  backgroundColor="#f3f3f3"
  foregroundColor="#cfcece"
  {...props}
>
  <rect x="285" y="355" rx="3" ry="3" width="88" height="6" /> 
  <rect x="-9" y="80" rx="3" ry="3" width="276" height="20" /> 
  <rect x="-5" y="5" rx="3" ry="3" width="356" height="19" /> 
  <rect x="-24" y="42" rx="3" ry="3" width="281" height="18" />
</ContentLoader>

)

export { Loader }