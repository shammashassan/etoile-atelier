import Link from "next/link";
import { Gem, DollarSign, CalendarCheck, Clock, Plus, ArrowUpRight } from "lucide-react";
import { getInventoryStats, getProducts } from "@/lib/queries/products";
import { getInquiries } from "@/lib/queries/inquiries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AdminOverviewPage() {
  const [stats, products, inquiries] = await Promise.all([
    getInventoryStats(),
    getProducts(),
    getInquiries(),
  ]);

  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div data-ui="admin-overview" className="space-y-8">
      {/* Page Title & Quick CTA */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-light tracking-wide text-foreground">
            Atelier Overview
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
            Real-time collection inventory & bespoke client inquiries
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/products/new">
            <Button size="sm">
              <Plus data-icon="inline-start" />
              Add New Piece
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Inventory Value
              </span>
              <DollarSign className="size-4 text-muted-foreground" />
            </div>
            <CardTitle className="font-heading text-2xl font-normal mt-2">
              ${stats.totalValue.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Across {stats.totalPieces} cataloged pieces
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                In-Stock Solitaires
              </span>
              <Gem className="size-4 text-muted-foreground" />
            </div>
            <CardTitle className="font-heading text-2xl font-normal mt-2">
              {stats.inStockCount} Pieces
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Ready for immediate insured dispatch
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Made to Order
              </span>
              <Clock className="size-4 text-muted-foreground" />
            </div>
            <CardTitle className="font-heading text-2xl font-normal mt-2">
              {stats.madeToOrderCount} Pieces
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Hand-set upon client commission
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Bespoke Inquiries
              </span>
              <CalendarCheck className="size-4 text-muted-foreground" />
            </div>
            <CardTitle className="font-heading text-2xl font-normal mt-2">
              {inquiries.length} Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {inquiries.filter((i) => i.status === "pending").length} pending consultations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout: Recent Products & Inquiries */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Catalog Pieces */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-heading text-lg font-light tracking-wide">
                  Recent Additions
                </CardTitle>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  Latest pieces in the showcase
                </p>
              </div>
              <Link href="/admin/products" className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground flex items-center gap-1">
                View All <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border/60">
              {products.slice(0, 4).map((item) => (
                <div key={item.slug} className="flex items-center justify-between py-3">
                  <div className="space-y-1">
                    <p className="text-xs font-medium tracking-wide text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {item.sku} • {item.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-foreground">
                      ${item.price.toLocaleString()}
                    </p>
                    <Badge variant={item.stockStatus === "in_stock" ? "default" : "secondary"}>
                      {item.stockStatus.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Bespoke Inquiries */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-heading text-lg font-light tracking-wide">
                  Client Consultations
                </CardTitle>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  Private viewing and commission requests
                </p>
              </div>
              <Link href="/admin/inquiries" className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground flex items-center gap-1">
                Manage <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentInquiries.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground uppercase tracking-widest">
                No inquiries submitted yet. Testing bookings will appear here.
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry._id || inquiry.email} className="flex items-center justify-between py-3">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-foreground">
                        {inquiry.fullName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {inquiry.jewelryType} • {inquiry.budgetRange}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {inquiry.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
