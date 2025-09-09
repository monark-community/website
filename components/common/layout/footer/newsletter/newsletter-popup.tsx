'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { getCookie, setCookie } from 'cookies-next'
import * as i18n from './newsletter.i18n'
import { Locale } from '@/i18n.config'

interface NewsletterPopupProps {
  /** Locale for translations (en or fr) */
  locale: Locale
  /** Delay in milliseconds before showing the popup (default: 15000) */
  delay?: number
  /** Number of days to remember dismissal (default: 30) */
  cookieExpiryDays?: number
  /** UTM parameters for tracking */
  utm?: {
    source?: string
    medium?: string
    campaign?: string
  }
  /** Additional tags to add to the subscriber */
  tags?: string[]
  /** Callback function when user subscribes successfully */
  onSubscribe?: (data: { email: string; firstName?: string; lastName?: string }) => void
  /** Callback function when popup is dismissed */
  onDismiss?: () => void
}

interface SubscriptionError {
  error: string
}

const COOKIE_NAME = 'newsletter-popup-dismissed'

export default function NewsletterPopup({
  locale,
  delay = 15000,
  cookieExpiryDays = 30,
  utm = { source: 'website', medium: 'popup', campaign: 'newsletter_signup' },
  tags = [],
  onSubscribe,
  onDismiss,
}: NewsletterPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const t = i18n[locale].newsletterPopup;

  useEffect(() => {
    // Check if popup was already dismissed (stored in cookie)
    const wasDismissed = getCookie(COOKIE_NAME)
    if (wasDismissed === 'true') {
      return
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true)
        setHasShown(true)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, hasShown])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setErrorMessage(t.invalidEmail)
      setSubscriptionStatus('error')
      return
    }

    setIsLoading(true)
    setSubscriptionStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: {
            email: email.trim(),
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            tags: tags,
          },
          utm: {
            source: utm.source || 'website',
            medium: utm.medium || 'popup',
            campaign: utm.campaign || 'newsletter_signup',
          },
        }),
      })

      if (!response.ok) {
        const errorData: SubscriptionError = await response.json()
        throw new Error(errorData.error || 'Subscription failed')
      }

      setSubscriptionStatus('success')

      // Call the onSubscribe callback if provided
      if (onSubscribe) {
        onSubscribe({
          email: email.trim(),
          firstName: firstName.trim() || undefined,
          lastName: lastName.trim() || undefined,
        })
      }

      // Auto-close after success message is shown
      setTimeout(() => {
        handleDismiss(true)
      }, 2000)

    } catch (error) {
      console.error('Subscription failed:', error)
      setSubscriptionStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDismiss = (subscribed: boolean = false) => {
    setIsOpen(false)
    setHasShown(true)

    if (subscribed) {
      // If user subscribed, set permanent cookie (no expiry)
      setCookie(COOKIE_NAME, 'true', {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        // No maxAge - cookie persists until manually deleted
      })
    } else {
      // If user just dismissed, set temporary cookie with expiry
      setCookie(COOKIE_NAME, 'true', {
        maxAge: cookieExpiryDays * 24 * 60 * 60, // Convert days to seconds
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    }

    if (onDismiss) {
      onDismiss()
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && subscriptionStatus !== 'success') {
      handleDismiss()
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">

          {/* Header with status-based styling */}
          <div className={`relative w-full overflow-hidden pointer-events-none !py-4 ${subscriptionStatus === 'success'
              ? 'bg-green-50 dark:bg-green-950/20'
              : subscriptionStatus === 'error'
                ? 'bg-red-50 dark:bg-red-950/20'
                : 'bg-primary/10'
            }`}>
            {/* Decorative mail icons */}
            <div className="absolute -right-6 -top-6">
              <Mail className={`h-28 w-28 transform rotate-45 ${subscriptionStatus === 'success'
                  ? 'text-green-500'
                  : subscriptionStatus === 'error'
                    ? 'text-red-500'
                    : 'text-primary'
                }`} />
            </div>

            <div className="absolute bottom-6 -left-2 pointer-events-none">
              <Mail className={`h-16 w-16 transform -rotate-12 ${subscriptionStatus === 'success'
                  ? 'text-green-500'
                  : subscriptionStatus === 'error'
                    ? 'text-red-500'
                    : 'text-primary'
                }`} />
            </div>

            <div className="absolute top-8 left-8 pointer-events-none">
              <Mail className={`h-8 w-8 transform rotate-12 ${subscriptionStatus === 'success'
                  ? 'text-green-500'
                  : subscriptionStatus === 'error'
                    ? 'text-red-500'
                    : 'text-primary'
                }`} />
            </div>

            {/* Content container */}
            <div className="relative z-10 flex h-full flex-col justify-center items-center px-8 text-center">
              <div className={`rounded-full p-3 mb-4 shadow-sm ${subscriptionStatus === 'success'
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : subscriptionStatus === 'error'
                    ? 'bg-red-100 dark:bg-red-900/30'
                    : 'bg-primary/30'
                }`}>
                {subscriptionStatus === 'success' ? (
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                ) : subscriptionStatus === 'error' ? (
                  <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                ) : (
                  <Mail className="h-8 w-8 text-primary" />
                )}
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
                {subscriptionStatus === 'success'
                  ? (t.successTitle)
                  : subscriptionStatus === 'error'
                    ? (t.errorTitle)
                    : t.title
                }
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {subscriptionStatus === 'success'
                  ? (t.successMessage)
                  : subscriptionStatus === 'error'
                    ? errorMessage
                    : t.description
                }
              </p>
            </div>
          </div>

          {/* Form content - hide when subscription is successful */}
          {subscriptionStatus !== 'success' && (
            <div className="p-4">
              <form onSubmit={handleSubscribe} className="space-y-4">
                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t.emailLabel}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>

                {/* Name fields - optional */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      {t.firstNameLabel}
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder={t.firstNamePlaceholder}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      {t.lastNameLabel}
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder={t.lastNamePlaceholder}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        {t.subscribing}
                      </>
                    ) : (
                      t.subscribeButton
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleDismiss()}
                    className="px-6"
                    disabled={isLoading}
                  >
                    {t.maybeLater}
                  </Button>
                </div>
              </form>

              {/* Legal notice */}
              <div className="mt-4 space-y-2">
                <p className="text-xs text-muted-foreground">
                  {t.privacyNote}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.legalNotice}{' '}
                  <a
                    href="https://www.beehiiv.com/tou"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground transition-colors"
                  >
                    {t.termsOfUse}
                  </a>
                  {' '}{t.and}{' '}
                  <a
                    href="https://www.beehiiv.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground transition-colors"
                  >
                    {t.privacyPolicy}
                  </a>
                  &nbsp;beehiiv.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}