"use client";

import React, { useState, useTransition } from "react";
import { Search, Eye, Mail, Trash2, CalendarCheck, Clock, DollarSign, UserCheck } from "lucide-react";
import { type Inquiry } from "@/lib/schemas/inquiry";
import { updateInquiryStatusAction, deleteInquiryAction } from "@/lib/actions/inquiry-actions";
import { BRAND } from "@/lib/data";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

interface InquiriesClientProps {
  initialInquiries: Inquiry[];
}

export function InquiriesClient({ initialInquiries }: InquiriesClientProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [deletingInquiryId, setDeletingInquiryId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (id?: string, newStatus?: Inquiry["status"]) => {
    if (!id || !newStatus) return;
    startTransition(async () => {
      await updateInquiryStatusAction(id, newStatus);
      if (activeInquiry && activeInquiry._id === id) {
        setActiveInquiry({ ...activeInquiry, status: newStatus });
      }
    });
  };

  const handleConfirmDelete = () => {
    if (!deletingInquiryId) return;
    const id = deletingInquiryId;
    setDeletingInquiryId(null);
    if (activeInquiry?._id === id) {
      setActiveInquiry(null);
    }
    startTransition(async () => {
      await deleteInquiryAction(id);
    });
  };

  const filteredInquiries = initialInquiries.filter((inquiry) => {
    const matchesSearch =
      !search ||
      inquiry.fullName.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.phone.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.jewelryType.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || inquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: Inquiry["status"]) => {
    switch (status) {
      case "completed":
        return "default";
      case "scheduled":
        return "outline";
      case "contacted":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-light tracking-wide text-foreground">
            Bespoke Appointments &amp; Inquiries
          </h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
            Review customer commission requests, private viewings, and appointment pipeline
          </p>
        </div>
      </div>

      {/* Filter and Search Bar using Shadcn Input & Select */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, phone, or service..."
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={(val) => {
              if (val) setStatusFilter(val);
            }}
          >
            <SelectTrigger className="h-9 w-44 border border-border bg-background px-3 text-xs uppercase tracking-wider text-foreground">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Pipeline Stages</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="contacted">Client Contacted</SelectItem>
                <SelectItem value="scheduled">Viewing Scheduled</SelectItem>
                <SelectItem value="completed">Completed Commission</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client &amp; Contact</TableHead>
              <TableHead>Requested Service</TableHead>
              <TableHead>Target Budget</TableHead>
              <TableHead>Preferred Timeline</TableHead>
              <TableHead>Pipeline Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="p-8">
                  <Empty className="p-6 border-none">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <CalendarCheck className="size-5" />
                      </EmptyMedia>
                      <EmptyTitle className="text-sm font-semibold">No Inquiries Found</EmptyTitle>
                      <EmptyDescription className="text-xs">
                        {search || statusFilter !== "all"
                          ? "No client consultations match your search or filter parameters."
                          : "No bespoke appointments booked yet. Submissions through the salon storefront will appear here."}
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              filteredInquiries.map((inquiry) => (
                <TableRow
                  key={inquiry._id || inquiry.email}
                  className={isPending ? "opacity-60" : ""}
                >
                  <TableCell>
                    <div className="space-y-0.5">
                      <span className="font-heading text-sm font-medium text-foreground block">
                        {inquiry.fullName}
                      </span>
                      <span className="text-xs text-muted-foreground block font-mono">
                        {inquiry.email} • {inquiry.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs tracking-wider uppercase text-foreground font-medium">
                      {inquiry.jewelryType}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-semibold text-foreground">
                      {inquiry.budgetRange}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {inquiry.preferredDate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={inquiry.status}
                      onValueChange={(val) => {
                        if (val) handleStatusChange(inquiry._id, val as Inquiry["status"]);
                      }}
                    >
                      <SelectTrigger className="h-8 w-36 border border-border bg-background px-2.5 text-xs uppercase tracking-wider text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => setActiveInquiry(inquiry)}
                        title="View Full Client Dossier"
                      >
                        <Eye className="size-3.5 text-muted-foreground hover:text-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        render={<a href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`${BRAND.name}: Private Salon Consultation`)}`} />}
                        nativeButton={false}
                        title={`Send Email to ${inquiry.fullName}`}
                      >
                        <Mail className="size-3.5 text-muted-foreground hover:text-foreground" />
                      </Button>
                      {inquiry._id && (
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => setDeletingInquiryId(inquiry._id || null)}
                          title="Delete dossier"
                        >
                          <Trash2 className="size-3.5 text-destructive/80 hover:text-destructive" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Shadcn Dialog: Full Client Consultation Dossier */}
      <Dialog
        open={Boolean(activeInquiry)}
        onOpenChange={(open) => {
          if (!open) setActiveInquiry(null);
        }}
      >
        {activeInquiry && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <div className="flex items-center justify-between pr-6">
                <DialogTitle className="font-heading text-xl font-normal">
                  Client Consultation Dossier
                </DialogTitle>
                <Badge variant={getStatusBadgeVariant(activeInquiry.status)}>
                  {activeInquiry.status.toUpperCase()}
                </Badge>
              </div>
              <DialogDescription className="text-xs uppercase tracking-widest text-muted-foreground">
                Private viewing coordinates &amp; aesthetic commission brief
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-3 border border-border p-3.5 bg-secondary/30">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                    Client Name
                  </span>
                  <span className="font-heading text-sm text-foreground block font-normal mt-0.5">
                    {activeInquiry.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                    Telephone
                  </span>
                  <a
                    href={`tel:${activeInquiry.phone}`}
                    className="font-mono text-xs text-foreground hover:underline block mt-0.5"
                  >
                    {activeInquiry.phone}
                  </a>
                </div>
                <div className="col-span-2 pt-1 border-t border-border/50">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${activeInquiry.email}`}
                    className="font-mono text-xs text-foreground hover:underline block mt-0.5"
                  >
                    {activeInquiry.email}
                  </a>
                </div>
              </div>

              {/* Commission Specifications */}
              <div className="grid grid-cols-2 gap-3 border border-border p-3.5 bg-card">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium flex items-center gap-1">
                    <UserCheck className="size-3" /> Commission Type
                  </span>
                  <span className="font-medium text-foreground block mt-1">
                    {activeInquiry.jewelryType}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium flex items-center gap-1">
                    <DollarSign className="size-3" /> Target Budget
                  </span>
                  <span className="font-semibold text-foreground block mt-1">
                    {activeInquiry.budgetRange}
                  </span>
                </div>
                <div className="col-span-2 pt-1 border-t border-border/50">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium flex items-center gap-1">
                    <Clock className="size-3" /> Preferred Timeline / Salon Date
                  </span>
                  <span className="text-foreground block mt-1">
                    {activeInquiry.preferredDate}
                  </span>
                </div>
              </div>

              {/* Client Aesthetic Notes */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                  Aesthetic Vision &amp; Notes
                </span>
                <div className="border border-border p-3 bg-muted/20 text-xs text-foreground leading-relaxed">
                  {activeInquiry.notes || "No bespoke notes provided by client."}
                </div>
              </div>

              {/* Quick Status Updater */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground font-medium">
                  Update Pipeline Status:
                </span>
                <Select
                  value={activeInquiry.status}
                  onValueChange={(val) => {
                    if (val) handleStatusChange(activeInquiry._id, val as Inquiry["status"]);
                  }}
                >
                  <SelectTrigger className="h-8 w-36 border border-border bg-background px-2.5 text-xs uppercase tracking-wider text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="flex flex-row justify-between sm:justify-between items-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                render={<a href={`mailto:${activeInquiry.email}?subject=${encodeURIComponent(`${BRAND.name} Consultation Coordinates`)}`} />}
                nativeButton={false}
              >
                <Mail data-icon="inline-start" />
                Draft Salon Email
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveInquiry(null)}
              >
                Close Dossier
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Shadcn AlertDialog: Confirm Delete Dossier */}
      <AlertDialog
        open={Boolean(deletingInquiryId)}
        onOpenChange={(open) => {
          if (!open) setDeletingInquiryId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Client Dossier</AlertDialogTitle>
            <AlertDialogDescription>
              Are you certain you wish to delete this consultation dossier? This record will be permanently purged from the atelier pipeline.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Confirm Deletion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
