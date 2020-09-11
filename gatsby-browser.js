/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import './tailwind.css'
import './global.css'
import React from 'react'
import RootLayout from './root-layout'
export const wrapRootElement = ({ element }) => {

  return (
    <RootLayout>{element}</RootLayout>
  )
} 
