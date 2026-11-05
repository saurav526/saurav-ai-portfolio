import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface RouterContextValue {
  pathname: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextValue>({
  pathname: '/',
  navigate: () => {},
  params: {},
});

// When index.html is opened directly from disk (file://), the real pathname is
// the file system path, so routing falls back to the URL hash (#/projects/...).
const USE_HASH = window.location.protocol === 'file:';

const readPathname = (): string => {
  if (USE_HASH) {
    const hash = window.location.hash.replace(/^#/, '');
    return hash.startsWith('/') ? hash : '/';
  }
  return window.location.pathname || '/';
};

export const toHref = (to: string): string => (USE_HASH ? `#${to}` : to);

export const BrowserRouter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pathname, setPathname] = useState<string>(readPathname);

  useEffect(() => {
    const onChange = () => {
      setPathname(readPathname());
    };
    window.addEventListener('popstate', onChange);
    window.addEventListener('hashchange', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('hashchange', onChange);
    };
  }, []);

  const navigate = (to: string) => {
    if (to === pathname) return;
    if (USE_HASH) {
      window.location.hash = to;
    } else {
      window.history.pushState({}, '', to);
    }
    setPathname(to);
  };

  const value = useMemo(
    () => ({ pathname, navigate, params: {} }),
    [pathname]
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

export const useLocation = () => {
  const { pathname } = useContext(RouterContext);
  return { pathname };
};

export const useNavigate = () => {
  const { navigate } = useContext(RouterContext);
  return navigate;
};

export function useParams<T extends Record<string, string | undefined>>(): T {
  const { params } = useContext(RouterContext);
  return params as unknown as T;
}

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export const Link: React.FC<LinkProps> = ({
  to,
  onClick,
  children,
  ...rest
}) => {
  const { navigate } = useContext(RouterContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !rest.target &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={toHref(to)} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export interface RouteProps {
  path: string;
  element: React.ReactNode;
}

export const Route: React.FC<RouteProps> = () => null;

function matchRoute(
  pattern: string,
  pathname: string
): Record<string, string> | null {
  if (pattern === '*') return {};
  const cleanPattern = pattern.replace(/\/+$/, '') || '/';
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPattern === cleanPath) return {};

  const patternParts = cleanPattern.split('/');
  const pathParts = cleanPath.split('/');
  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i];
    const cp = pathParts[i];
    if (pp.startsWith(':')) {
      params[pp.slice(1)] = decodeURIComponent(cp);
    } else if (pp !== cp) {
      return null;
    }
  }
  return params;
}

export const Routes: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ctx = useContext(RouterContext);
  const childArray = React.Children.toArray(children) as React.ReactElement<RouteProps>[];

  for (const child of childArray) {
    if (!React.isValidElement(child)) continue;
    const { path, element } = child.props;
    const matchedParams = matchRoute(path, ctx.pathname);
    if (matchedParams !== null) {
      return (
        <RouterContext.Provider value={{ ...ctx, params: matchedParams }}>
          {element}
        </RouterContext.Provider>
      );
    }
  }
  return null;
};
