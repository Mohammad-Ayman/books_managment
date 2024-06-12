package services

import (
    "github.com/mohammad-ayman/books_managment/canonicalRedirect/utils"
)

const (
    OperationCanonical = "canonical"
    OperationRedirect  = "redirect"
    OperationAll       = "all"
)

func ProcessURL(operation, url string) string {
    switch operation {
    case OperationCanonical:
        return utils.CanonicalUrl(url)
    case OperationRedirect:
        return utils.RedirectUrl(url)
    case OperationAll:
        cleanedUrl := utils.CanonicalUrl(url)
        return utils.RedirectUrl(cleanedUrl)
    default:
        return ""
    }
}
