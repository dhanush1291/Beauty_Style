import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, X, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { useWishlist, useMounted } from "@/lib/wishlist";
import { products } from "@/data/products";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useNavigate } from "@tanstack/react-router";

const NAV = [
  { category: "cosmetics", path: "/shop/cosmetics", label: "Cosmetics" },
  { category: "new", path: "/shop/new", label: "New Arrivals" },
  { category: "sale", path: "/shop/sale", label: "Sale" },
] as const;

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { ids } = useWishlist();
  const mounted = useMounted();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="w-full">
      {/* Announcement Bar */}
      <div className="bg-primary/40 py-2 text-center text-[11px] font-medium tracking-wider uppercase flex items-center justify-center gap-2">
        <span>💕 custom engraving on all cosmic bottles 💕</span>
        <Link to="/shop/$category" params={{ category: "cosmetics" }} className="underline">shop now</Link>
      </div>

      <div className={`sticky top-0 z-40 w-full border-b transition-colors ${scrolled ? "bg-background/95 backdrop-blur-md border-border" : "bg-background border-transparent"}`}>
        {/* Top Header: Region, Logo, Icons */}
        <div className="mx-auto flex h-14 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Region */}
          <div className="hidden lg:flex flex-1 text-[11px] font-medium text-foreground/60 uppercase tracking-widest gap-2 items-center">
            <span>in</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground/20">₹</span>
          </div>

          {/* Mobile menu - Left on mobile */}
          <div className="flex items-center gap-2 lg:hidden flex-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="mt-6 flex flex-col gap-1">
                  <Logo height="h-8" />
                  <nav className="mt-8 flex flex-col gap-1">
                    {NAV.map((n) => (
                      <Link
                        key={n.path}
                        to="/shop/$category"
                        params={{ category: n.category }}
                        className="rounded-md px-3 py-3 text-base font-medium hover:bg-muted"
                      >
                        {n.label}
                      </Link>
                    ))}
                    <Link to="/about" className="rounded-md px-3 py-3 text-base hover:bg-muted">About</Link>
                    <Link to="/contact" className="rounded-md px-3 py-3 text-base hover:bg-muted">Contact</Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Center: Branding */}
          <div className="flex flex-col items-center justify-center flex-1">
            <Logo height="h-6 md:h-10" />
            <span className="hidden md:block text-[9px] uppercase tracking-[0.4em] font-medium text-foreground/60 -mt-1">
              INFINA beauty
            </span>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center justify-end gap-1 flex-1">
            <Link to="/wishlist" aria-label="Wishlist" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" aria-label="Account">
              <Search className="h-4 w-4" onClick={() => setSearchOpen(true)} />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Search" className="hidden lg:flex">
              {/* User Icon Placeholder */}
              <div className="h-4 w-4 border-2 border-foreground/70 rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
                <path d="M3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
              {mounted && ids.length > 0 && (
                <span className="absolute right-1 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[7px] font-bold">
                  {ids.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Bottom Header: Navigation (Desktop Only) */}
        <nav className="hidden h-10 items-center justify-center gap-12 border-t lg:flex">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.path);
            return (
              <Link
                key={n.path}
                to="/shop/$category"
                params={{ category: n.category }}
                className={`text-[12px] font-medium lowercase tracking-wide transition-colors hover:text-primary ${active ? "text-primary" : "text-foreground/80"}`}
              >
                {n.label.toLowerCase()}
              </Link>
            );
          })}
          <Link to="/about" className="text-[12px] font-medium lowercase tracking-wide text-foreground/80 hover:text-primary">discover</Link>
          <Link to="/contact" className="text-[12px] font-medium lowercase tracking-wide text-foreground/80 hover:text-primary">rewards</Link>
        </nav>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search collections, products..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {products.slice(0, 30).map((p) => (
              <CommandItem
                key={p.id}
                value={`${p.name} ${p.brand} ${p.subcategory}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/product/$id", params: { id: p.id } });
                }}
              >
                <span className="text-xs uppercase text-muted-foreground mr-2">{p.brand}</span>
                {p.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}


export function Footer() {
  return (
    <footer className="mt-24 border-t bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-12 px-6 py-20 md:grid-cols-4 lg:px-8">
        <div className="col-span-2">
          <Logo height="h-10 md:h-12" />
          <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
            Experience the future of beauty. High-performance formulas, clean ingredients, and curated luxury.
          </p>
          <div className="mt-8 flex gap-6">
            {/* Social placeholders */}
            <div className="h-5 w-5 bg-foreground/10 rounded-full" />
            <div className="h-5 w-5 bg-foreground/10 rounded-full" />
            <div className="h-5 w-5 bg-foreground/10 rounded-full" />
          </div>
        </div>
        <div>
          <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">Shop</h4>
          <ul className="space-y-4 text-[13px] font-light text-muted-foreground">
            <li><Link to="/shop/$category" params={{ category: "cosmetics" }} className="hover:text-primary transition-colors">All Cosmetics</Link></li>
            <li><Link to="/shop/$category" params={{ category: "new" }} className="hover:text-primary transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop/$category" params={{ category: "sale" }} className="hover:text-primary transition-colors">Summer Sale</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">Support</h4>
          <ul className="space-y-4 text-[13px] font-light text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/policies/returns" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/policies/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} INFINA BEAUTY. All rights reserved.</p>
          <div className="flex gap-8">
            <span>Powered by INFINA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
