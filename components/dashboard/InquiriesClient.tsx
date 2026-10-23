"use client";

import React, { useTransition } from "react";
import { type Inquiry } from "@/lib/schemas/inquiry";
import { updateInquiryStatusAction } from "@/lib/actions/inquiry-actions";
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

interface InquiriesClientProps {
  initialInquiries: Inquiry[];
}

export function InquiriesClient({ initialInquiries }: InquiriesClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (id?: string, newStatus?: Inquiry["status"]) => {
    if (!id || !newStatus) return;
    startTransition(async () => {
      await updateInquiryStatusAction(id, newStatus);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-light tracking-wide text-foreground">
          Bespoke Appointments &amp; Inquiries
        </h1>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
          Review customer commission requests, private viewings, and appointment pipeline
        </p>
      </div>

      <div className="border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Requested Service</TableHead>
              <TableHead>Budget Range</TableHead>
              <TableHead>Preferred Date</TableHead>
              <TableHead>Client Notes</TableHead>
              <TableHead>Pipeline Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialInquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-xs text-muted-foreground uppercase tracking-wider">
                  No bespoke appointments booked yet. Submissions through the public storefront will appear here.
                </TableCell>
              </TableRow>
            ) : (
              initialInquiries.map((inquiry) => (
                <TableRow key={inquiry._id || inquiry.email} className={isPending ? "opacity-60" : ""}>
                  <TableCell>
                    <div className="space-y-0.5">
                      <span className="font-medium text-xs text-foreground block">
                        {inquiry.fullName}
                      </span>
                      <span className="text-xs text-muted-foreground block">
                        {inquiry.email} • {inquiry.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs tracking-wider uppercase text-foreground">
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
                    <p className="max-w-xs text-xs text-muted-foreground truncate" title={inquiry.notes}>
                      {inquiry.notes || "No additional notes provided."}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={inquiry.status}
                      onValueChange={(val) => {
                        if (val) handleStatusChange(inquiry._id, val as Inquiry["status"]);
                      }}
                    >
                      <SelectTrigger className="h-8 w-32 border border-border bg-background px-2 text-xs uppercase tracking-wider text-foreground">
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
