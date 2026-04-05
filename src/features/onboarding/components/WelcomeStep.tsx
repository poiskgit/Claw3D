/**
 * WelcomeStep — First onboarding screen introducing Claw3D.
 */
import { Building2, Eye, MessageSquare, Users } from "lucide-react";

import { useTranslation } from "@/lib/i18n/useTranslation";

export const WelcomeStep = () => {
  const { t } = useTranslation();


  const features = [
    {
      id: "watch",
      icon: Eye,
      title: t("onboarding.features.watch.title" as any),
      description: t("onboarding.features.watch.desc" as any),
    },
    {
      id: "manage",
      icon: Users,
      title: t("onboarding.features.manage.title" as any),
      description: t("onboarding.features.manage.desc" as any),
    },
    {
      id: "chat",
      icon: MessageSquare,
      title: t("onboarding.features.chat.title" as any),
      description: t("onboarding.features.chat.desc" as any),
    },
    {
      id: "build",
      icon: Building2,
      title: t("onboarding.features.build.title" as any),
      description: t("onboarding.features.build.desc" as any),
    },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm leading-relaxed text-white/80">
          {t("onboarding.welcomeDesc")}
        </p>
        <p className="text-sm text-white/60">
          {t("onboarding.welcomeSubDesc")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {features.map(({ id, icon: Icon, title, description }) => (
          <div
            key={id}
            className="rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-3"
          >
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-amber-300" />
              <span className="text-xs font-semibold text-white">{title}</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-white/55">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
