import { Link } from 'react-aria-components'

const socials = [
  {
    label: 'Xbox su Facebook',
    href: 'https://www.facebook.com/xbox/',
    viewBox: '0 0 8 16',
    path: 'M5,16H2V8H0V5H2V3.077a2.932,2.932,0,0,1,.832-2.3A3.763,3.763,0,0,1,5.461,0H8V3H6.075C5.382,3,5,3.316,5,3.889V5H8L7.763,8H5v8Z',
  },
  {
    label: 'Xbox su Twitter',
    href: 'https://twitter.com/Xbox',
    viewBox: '0 0 16 13',
    path: 'M5.032,13A9.318,9.318,0,0,1,0,11.526a6.73,6.73,0,0,0,.784.046A6.629,6.629,0,0,0,4.86,10.166,3.282,3.282,0,0,1,1.793,7.887a3.326,3.326,0,0,0,.621.059,3.281,3.281,0,0,0,.861-.115A3.3,3.3,0,0,1,.643,4.571a3.28,3.28,0,0,0,1.486.412A3.292,3.292,0,0,1,1.114.6,9.34,9.34,0,0,0,7.879,4.029a3.283,3.283,0,0,1,5.593-2.991,6.561,6.561,0,0,0,2.087-.8,3.29,3.29,0,0,1-1.444,1.816A6.61,6.61,0,0,0,16,1.539a6.644,6.644,0,0,1-1.639,1.7,9.675,9.675,0,0,1-2.638,6.985A9,9,0,0,1,5.032,13Z',
  },
  {
    label: 'Xbox su Instagram',
    href: 'https://www.instagram.com/xbox/',
    viewBox: '0 0 16 16',
    path: 'M8,16c-2.14,0-2.427-.01-3.3-.049C1.793,15.819.184,14.209.048,11.3.009,10.434,0,10.147,0,8S.009,5.566.048,4.7C.184,1.79,1.793.181,4.7.05,5.562.009,5.847,0,8,0c2.135,0,2.423.009,3.3.048a4.908,4.908,0,0,1,3.369,1.288A4.9,4.9,0,0,1,15.952,4.7C15.991,5.564,16,5.849,16,8s-.009,2.436-.048,3.3c-.131,2.91-1.74,4.519-4.653,4.652C10.429,15.99,10.142,16,8,16ZM8,1.443c-2.126,0-2.38.008-3.231.045a3.485,3.485,0,0,0-2.417.87A3.494,3.494,0,0,0,1.49,4.767C1.45,5.634,1.442,5.892,1.442,8c0,2.169.011,2.416.046,3.232A3.5,3.5,0,0,0,2.35,13.64a3.481,3.481,0,0,0,2.417.871c.854.037,1.135.046,3.233.046,2.155,0,2.405-.008,3.233-.046a3.482,3.482,0,0,0,2.416-.871,3.492,3.492,0,0,0,.863-2.409c.038-.834.046-1.085.046-3.232s-.008-2.4-.046-3.231a3.494,3.494,0,0,0-.864-2.41,3.481,3.481,0,0,0-2.415-.87C10.38,1.451,10.126,1.443,8,1.443ZM8,12.107A4.107,4.107,0,1,1,12.107,8,4.112,4.112,0,0,1,8,12.107ZM8,5.332A2.667,2.667,0,1,0,10.667,8,2.67,2.67,0,0,0,8,5.332Zm4.271-.642a.96.96,0,1,1,.959-.96A.961.961,0,0,1,12.271,4.69Z',
  },
]

const SocialLinks = () => (
  <ul className="flex items-center">
    {socials.map(({ label, href, viewBox, path }) => (
      <li key={href}>
        <Link
          aria-label={label}
          className="group flex min-h-[34px] min-w-[34px] items-center justify-center rounded-md outline-none transition-colors duration-100 ease-cubic data-focus-visible:bg-dark-secondary data-hovered:bg-dark-secondary"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-auto fill-pure-white/50 transition-colors duration-200 ease-cubic group-data-focus-visible:fill-green group-data-hovered:fill-green"
            focusable="false"
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={path} />
          </svg>
        </Link>
      </li>
    ))}
  </ul>
)

export { SocialLinks }
