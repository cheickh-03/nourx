import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    entreprise: "",
    service: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!formData.service)
      newErrors.service = "Veuillez sélectionner un service";
    if (!formData.description.trim())
      newErrors.description = "La description du projet est requise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Ici, vous pourriez envoyer les données à un serveur
      console.log("Données du formulaire soumises:", formData);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-8 text-blue-400 hover:text-blue-300 hover:bg-blue-950/30"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Button>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 p-10 rounded-xl border border-blue-900 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-900/30 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-blue-400">
              Merci pour votre demande!
            </h1>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Nous avons bien reçu les détails de votre projet. Notre équipe va
              étudier votre demande et vous contactera dans les plus brefs
              délais.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate("/")}
            >
              Retourner à l'accueil
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 text-blue-400">
                Démarrer un Projet
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Parlez-nous de votre projet et découvrez comment nous pouvons
                vous aider à concrétiser votre vision digitale.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-blue-900 shadow-lg shadow-blue-900/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="nom"
                      className="text-sm font-medium text-gray-300"
                    >
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 ${errors.nom ? "border-red-500" : ""}`}
                    />
                    {errors.nom && (
                      <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-300"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="telephone"
                      className="text-sm font-medium text-gray-300"
                    >
                      Téléphone
                    </label>
                    <Input
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="+225 XX XX XX XX XX"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="entreprise"
                      className="text-sm font-medium text-gray-300"
                    >
                      Entreprise
                    </label>
                    <Input
                      id="entreprise"
                      name="entreprise"
                      value={formData.entreprise}
                      onChange={handleChange}
                      placeholder="Nom de votre entreprise"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="service"
                    className="text-sm font-medium text-gray-300"
                  >
                    Service requis <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger
                      className={`bg-gray-800 border-gray-700 text-white focus:border-blue-500 ${errors.service ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Sélectionnez un service" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="web-development">
                        Développement Web
                      </SelectItem>
                      <SelectItem value="app-design">
                        Conception d'Applications
                      </SelectItem>
                      <SelectItem value="digital-creation">
                        Création Digitale
                      </SelectItem>
                      <SelectItem value="marketing">
                        Marketing Digital
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-300"
                  >
                    Description du projet{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet, vos objectifs et vos attentes..."
                    className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 min-h-[150px] ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-medium"
                  >
                    Soumettre votre projet
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
