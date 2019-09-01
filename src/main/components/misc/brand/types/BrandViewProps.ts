// internal imports
import BrandProps from './BrandProps'
import defaultBrandProps from '../defaults/defaultBrandProps'

// --- BrandViewProps -----------------------------------------------

type BrandViewProps = BrandProps & typeof defaultBrandProps
let x: BrandViewProps = {} as any

// -- exports -------------------------------------------------------

export default BrandViewProps
