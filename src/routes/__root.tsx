import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6 overflow-hidden noise">
      {/* Decorative Blur Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      
      <div className="max-w-md text-center relative z-10">
        <h1 className="text-[clamp(5rem,15vw,10rem)] font-display text-stroke leading-none">
          404<span className="text-primary">.</span>
        </h1>
        <h2 className="mt-6 text-2xl md:text-3xl font-display uppercase tracking-tight text-foreground">
          PAGE NOT FOUND
        </h2>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          The page you're looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="bg-primary text-primary-foreground px-8 py-4 text-xs font-semibold tracking-widest hover:bg-foreground transition inline-flex items-center gap-3 cursor-pointer uppercase"
          >
            GO TO HOMEPAGE <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return <Outlet />;
}

