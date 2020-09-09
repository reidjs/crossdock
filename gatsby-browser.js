/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import RootLayout from './root-layout'
import './tailwind.css'
import './global.css'

// https://stackoverflow.com/questions/58063372/where-to-put-context-provider-in-gatsby
export const wrapRootElement = ({ element }) => {
  return (
    <RootLayout>{element}</RootLayout>
  )
} 
