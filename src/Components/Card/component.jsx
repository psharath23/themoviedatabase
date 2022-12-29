import "./style.scss"

import cn from "classnames"

export const Card = ({ children, className, ...rest }) => {
    return <div className={cn("card", className)} {...rest}>
        {children}
    </div>
}