import "./style.scss"

import cn from "classnames"

export const Button = ({ className, ...rest }) => {
    return <button className={cn("btn", className)} {...rest}></button>
}