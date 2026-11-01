import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteSweep, MdReportGmailerrorred } from "react-icons/md";
import { FaCheckCircle, FaPlus } from "react-icons/fa";

import "trix";
import "trix/dist/trix.css";
import {
  getProductCategories,
  getSportCategories,
} from "../../redux/actions/product_category";
import getLevels from "../../redux/actions/misc";
import getGenders from "../../redux/actions/gender";
import {
  clothSizes,
  composition,
  gripSizes,
  headShapes,
  headSizes,
  length,
  locations as states,
  playType,
  recommendedGrip,
  shoeSizes,
  strung,
  stringSizes,
} from "../../constants/variance";
import Button from "../buttons/Button";
import FormInput from "../formInput/FormInput";
import { resetProduct } from "../../redux/product/product";
import { colors } from "../../constants/global";
import { pickColor } from "../../utils/get_colors";

/* -------------------------------------------------------------------------- */
/*  Constants & config                                                        */
/* -------------------------------------------------------------------------- */

const MAX_DESCRIPTION = 250;
const MAX_COLOURS = 2;
const RESET_DELAY_MS = 5000;
const INITIAL_VALUES = { status: "active" };
const STATUS_OPTIONS = [
  { value: "active", label: "active" },
  { value: "inactive", label: "inactive" },
];

// Keys that live in form state for display only and are never sent to the API.
const NON_SUBMITTED_KEYS = new Set(["photo_urls"]);

const createInventory = () => ({
  size: "",
  quantity: "",
  sku: "",
  locations: [],
});

// A spec is a text input unless it has `options` ("levels" is resolved at render).
const spec = (key, label, options) => ({ key, label, options });

const SPECS = {
  tennis: [
    spec("level_id", "Professionalism", "levels"),
    spec("strung", "Strung / unstrung", strung),
    spec("head_size", "Head size: cm", headSizes),
    spec("composition", "Composition", composition),
    spec("length", "Length (mm)", length),
    spec("weight", "Weight (g)"),
    spec("tension", "Tension (kg)"),
    spec("stiffness", "Stiffness (kg)"),
  ],
  padel: [
    spec("player_type", "Type of player", playType),
    spec("head_shape", "Head shape", headShapes),
    spec("recommended_grip", "Recommended grip", recommendedGrip),
    spec("composition", "Composition", composition),
    spec("length", "Length (mm)", length),
    spec("weight", "Weight (g)"),
    spec("thickness", "Thickness (mm)"),
    spec("stiffness", "Stiffness (kg)"),
  ],
  badminton: [
    spec("player_type", "Type of player", playType),
    spec("composition", "Composition", composition),
    spec("length", "Length (mm)", length),
    spec("weight", "Weight (g)"),
    spec("thickness", "Thickness (mm)"),
    spec("stiffness", "Stiffness (kg)"),
  ],
};

const KIND_CONFIG = {
  tennis: {
    legend: "Racquet",
    sizeLabel: "Racquet grip size",
    sizeOptions: gripSizes,
  },
  padel: {
    legend: "Padel racquet",
    sizeLabel: "Padel grip size",
    sizeOptions: gripSizes,
  },
  badminton: {
    legend: "Badminton racquet",
    sizeLabel: "Size",
    sizeOptions: gripSizes,
  },
  shoe: { legend: "Shoe", sizeLabel: "Shoe size", sizeOptions: shoeSizes },
  apparel: {
    legend: "Apparel",
    sizeLabel: "Apparel size",
    sizeOptions: clothSizes,
  },
  string: {
    legend: "String",
    sizeLabel: "String size (gauge)",
    sizeOptions: stringSizes,
  },
  other: { legend: "Other", sizeLabel: "Size", sizeOptions: clothSizes },
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const sameId = (a, b) => a != null && b != null && String(a) === String(b);

// Builds the `{ value, label }` object react-select style inputs expect.
const toOption = (options, current, fallback) => {
  const match =
    current != null && current !== ""
      ? options?.find((option) => sameId(option.value, current))
      : undefined;

  return {
    value: current,
    label: match ? (match.label ?? match.value) : current || fallback,
  };
};

const resolveKind = (category, sport) => {
  if (category === "racquet") {
    return sport === "tennis" || sport === "padel" ? sport : "badminton";
  }
  if (category === "shoe" || category === "apparel") return category;
  if (category.startsWith("string")) return "string";
  return "other";
};

const buildFormData = ({ values, inventories, files }) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (NON_SUBMITTED_KEYS.has(key) || value == null) return;

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const field =
          key === "colours" ? `product[${key}][]` : `product[${key}][${index}]`;
        formData.append(field, item);
      });
    } else {
      formData.append(`product[${key}]`, value);
    }
  });

  inventories.forEach(
    ({ id, quantity, size, sku, price, locations, _destroy }, index) => {
      const prefix = `product[product_inventories_attributes][${index}]`;

      if (id) formData.append(`${prefix}[id]`, id);
      if (quantity !== "" && quantity != null) {
        formData.append(`${prefix}[quantity]`, quantity);
      }
      if (_destroy) formData.append(`${prefix}[_destroy]`, _destroy);
      if (size) formData.append(`${prefix}[size]`, size);
      if (sku) formData.append(`${prefix}[sku]`, sku);
      locations?.forEach((location) =>
        formData.append(`${prefix}[locations][]`, location),
      );
      formData.append(`${prefix}[price]`, price || values.price || "");
    },
  );

  files.forEach((file, index) => {
    formData.append(`product[photos][${index}]`, file);
  });

  return formData;
};

/* -------------------------------------------------------------------------- */
/*  Small presentational pieces                                               */
/* -------------------------------------------------------------------------- */

const labelClass = "mb-1 block text-sm font-semibold text-gray-600";
const fieldClass =
  "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

const Section = ({ title, children }) => (
  <fieldset className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <legend className="px-2 text-base font-bold text-gray-800">{title}</legend>
    {children}
  </fieldset>
);

const PreviewGrid = ({ urls }) => (
  <div className="my-4 flex flex-wrap gap-4">
    {urls.map((url, index) => (
      <img
        key={`${url}-${index}`}
        src={url}
        alt={`Product preview ${index + 1}`}
        className="w-40 overflow-hidden rounded border border-gray-300 bg-gray-100 p-3"
      />
    ))}
  </div>
);

const StatusMessage = ({ loading, status, message }) => {
  if (loading) return <p className="my-3 text-gray-600">{message}</p>;

  if (status === "success") {
    return (
      <p
        role="status"
        className="my-3 flex items-center gap-3 rounded bg-green-100 p-5 text-green-900"
      >
        <FaCheckCircle className="text-3xl text-green-700" aria-hidden />
        {message}
      </p>
    );
  }

  if (status === "rejected") {
    return (
      <p
        role="alert"
        className="my-3 flex items-center gap-3 rounded bg-red-100 p-5 text-red-900"
      >
        <MdReportGmailerrorred className="text-3xl text-red-700" aria-hidden />
        {message}
      </p>
    );
  }

  return null;
};

const INVENTORY_GRID =
  "grid grid-cols-[1.2fr_1fr_1fr_1.6fr_2rem] items-center gap-3";

const InventoryTable = ({
  sizeLabel,
  sizeOptions,
  rows,
  onAdd,
  onChange,
  onRemove,
}) => {
  // Keep the original index so edits and deletes hit the right row
  // even after earlier rows were soft-deleted.
  const visibleRows = rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => !row._destroy);
  console.log(sizeOptions);

  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-700">Inventory</h3>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-700"
        >
          <FaPlus aria-hidden /> Add row
        </button>
      </div>

      <div className="overflow-x-auto overflow-y-visible">
        <div className="min-w-[640px] w-full">
          <div
            className={`${INVENTORY_GRID} text-sm font-semibold text-gray-500`}
          >
            <span>{sizeLabel}</span>
            <span>Quantity</span>
            <span>SKU</span>
            <span>Location</span>
            <span />
          </div>

          {visibleRows.length === 0 && (
            <p className="py-4 text-sm text-gray-500">
              No inventory rows yet. Add a row to set size, quantity and
              location.
            </p>
          )}

          {visibleRows.map(({ row, index }) => (
            <div
              key={row.id ?? `new-${index}`}
              className={`${INVENTORY_GRID} my-2`}
            >
              <FormInput
                type="select"
                name="sizes"
                id={`size-${index}`}
                placeholder={sizeLabel}
                options={sizeOptions}
                value={toOption(sizeOptions, row.size, "Select size")}
                onChange={({ value }) => onChange(index, "size", value)}
                size={1}
                menuPortalTarget={
                  typeof document !== "undefined" ? document.body : null
                }
                menuPosition="fixed"
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />

              <FormInput
                type="number"
                name="quantity"
                id={`qty-${index}`}
                placeholder="Quantity"
                value={row.quantity}
                onChange={(e) => onChange(index, "quantity", e.target.value)}
              />

              <FormInput
                name="sku"
                id={`sku-${index}`}
                placeholder="SKU"
                value={row.sku}
                onChange={(e) => onChange(index, "sku", e.target.value)}
              />

              <FormInput
                type="select"
                name="locations"
                id={`location-${index}`}
                placeholder="Add product location"
                options={states}
                value={(row.locations ?? []).map((location) => ({
                  value: location,
                  label:
                    states.find((state) => state.value === location)?.label ??
                    location,
                }))}
                onChange={(selected) =>
                  onChange(
                    index,
                    "locations",
                    (selected ?? []).map((option) => option.value),
                  )
                }
                isMulti
                size={1}
                menuPortalTarget={
                  typeof document !== "undefined" ? document.body : null
                }
                menuPosition="fixed"
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              />

              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove inventory row ${index + 1}`}
                className="text-gray-500 transition-colors hover:text-red-600"
              >
                <MdDeleteSweep className="text-xl" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

const ProductForm = ({ onSubmit, product, isDuplicate, setIsDuplicate }) => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const editorRef = useRef(null);
  const trixInputRef = useRef(null);
  const resetTimer = useRef(null);

  const { product_categories = [], sport_categories = [] } = useSelector(
    (state) => state.product_categories,
  );
  const levels = useSelector((state) => state.level.levels) ?? [];
  const genders = useSelector((state) => state.gender.genders) ?? [];
  const { loading, status, message } = useSelector((state) => state.product);
  const [isSubmitting, setIssSubmitting] = useState(false);
  console.log(loading);

  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [productInventories, setProductInventories] = useState([
    createInventory(),
  ]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [formError, setFormError] = useState("");

  /* ----------------------------- derived state ---------------------------- */

  const isActive = formValues.status === "active";
  const activeFieldProps = { productStatus: "active", required: isActive };

  const descriptionCount = formValues.description?.length ?? 0;
  const isDescMax = descriptionCount >= MAX_DESCRIPTION;

  const sportOptions = useMemo(
    () => sport_categories.map((cat) => ({ value: cat.id, label: cat.name })),
    [sport_categories],
  );
  const categoryOptions = useMemo(
    () => product_categories.map((cat) => ({ value: cat.id, label: cat.name })),
    [product_categories],
  );
  const levelOptions = useMemo(
    () => levels.map((level) => ({ value: level.id, label: level.stage })),
    [levels],
  );
  const genderOptions = useMemo(
    () => genders.map((gender) => ({ value: gender.id, label: gender.name })),
    [genders],
  );

  // Falls back to the second sport / first category until one is chosen
  // (same defaults as before).
  const selectedSport = (
    sport_categories.find((cat) => sameId(cat.id, formValues.sport_category_id))
      ?.name ??
    sport_categories[1]?.name ??
    ""
  ).toLowerCase();

  const selectedCategory = (
    product_categories.find((cat) =>
      sameId(cat.id, formValues.product_category_id),
    )?.name ??
    product_categories[0]?.name ??
    ""
  ).toLowerCase();

  const kind = resolveKind(selectedCategory, selectedSport);
  const { legend, sizeLabel, sizeOptions } = KIND_CONFIG[kind];
  console.log(sizeOptions);

  const specFields = SPECS[kind] ?? [];

  const totalQuantity = useMemo(
    () =>
      productInventories
        .filter((item) => !item._destroy)
        .reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
    [productInventories],
  );

  const selectedColours = formValues.colours ?? [];
  const colourSwatch =
    selectedColours.length >= 2
      ? `linear-gradient(135deg, ${pickColor(selectedColours[0])} 50%, ${pickColor(selectedColours[1])} 50%)`
      : selectedColours.length === 1
        ? pickColor(selectedColours[0])
        : "#fff";

  const photoPreviews = useMemo(
    () => photoFiles.map((file) => URL.createObjectURL(file)),
    [photoFiles],
  );

  /* ------------------------------- effects -------------------------------- */

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getSportCategories());
    dispatch(getLevels());
    dispatch(getGenders());
  }, [dispatch]);

  // Keep the rich text editor in sync with form state.
  useEffect(() => {
    const editorEl = editorRef.current;
    if (!editorEl) return undefined;

    const handleChange = () =>
      setFormValues((prev) => ({
        ...prev,
        description_body: trixInputRef.current?.value ?? "",
      }));

    editorEl.addEventListener("trix-change", handleChange);
    return () => editorEl.removeEventListener("trix-change", handleChange);
  }, []);

  // Populate the form when editing an existing product.
  useEffect(() => {
    if (!product) return;

    const {
      product_category,
      level,
      gender,
      sport_category,
      product_inventories,
      ...rest
    } = product;

    setFormValues({
      ...rest,
      product_category_id: product_category?.id,
      level_id: level?.id,
      gender_id: gender?.id,
      sport_category_id: sport_category?.id,
    });

    setProductInventories(
      product_inventories?.length
        ? product_inventories.map((item) => ({
            ...item,
            locations: item.locations ?? [],
          }))
        : [createInventory()],
    );

    const html = product.description_body ?? "";
    const editorEl = editorRef.current;
    if (editorEl?.editor) {
      editorEl.editor.loadHTML(html);
    } else {
      editorEl?.addEventListener(
        "trix-initialize",
        () => editorRef.current?.editor?.loadHTML(html),
        { once: true },
      );
    }
  }, [product]);

  // Free object URLs when previews change or the form unmounts.
  useEffect(
    () => () => photoPreviews.forEach((url) => URL.revokeObjectURL(url)),
    [photoPreviews],
  );

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  /* ------------------------------- handlers ------------------------------- */

  const setValue = (key) => (value) =>
    setFormValues((prev) => ({ ...prev, [key]: value }));

  // Props for plain inputs. `transform` runs on the typed value.
  const inputProps = (key, { type = "text", transform } = {}) => ({
    name: key,
    id: key,
    type,
    value: formValues[key] ?? "",
    onChange: ({ target: { value } }) =>
      setValue(key)(transform ? transform(value) : value),
  });

  // Props for select inputs.
  const selectProps = (key, options, placeholder) => ({
    name: key,
    id: key,
    type: "select",
    options,
    placeholder,
    value: toOption(options, formValues[key], `Select ${placeholder}`),
    onChange: ({ value }) => setValue(key)(value),
  });

  const addInventory = () =>
    setProductInventories((prev) => [...prev, createInventory()]);

  const updateInventory = (index, key, value) =>
    setProductInventories((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );

  // Saved rows are soft-deleted so the API can destroy them; new rows are dropped.
  const removeInventory = (index) =>
    setProductInventories((prev) =>
      prev[index]?.id
        ? prev.map((item, i) =>
            i === index ? { ...item, _destroy: true } : item,
          )
        : prev.filter((_, i) => i !== index),
    );

  const toggleDiscount = () =>
    setFormValues((prev) => ({
      ...prev,
      discount:
        prev.discount === "active_discount"
          ? "inactive_discount"
          : "active_discount",
    }));

  const handleSubmit = (event) => {
    console.log("object");

    event.preventDefault();
    setFormError("");
    console.log("object");

    const hasImage =
      Boolean(product && formValues.photo_urls) ||
      photoFiles.length > 0 ||
      imageUrl.trim() !== "";
    console.log("object");

    if (!hasImage) {
      setFormError("Add at least one product image or image URL.");
      return;
    }
    setIssSubmitting(true);

    const formData = buildFormData({
      values: { ...formValues, product_quantity: totalQuantity },
      inventories: productInventories,
      files: photoFiles,
    });

    Promise.resolve(onSubmit(formData))
      .then(() => {
        resetTimer.current = setTimeout(() => {
          if (!product) {
            setFormValues(INITIAL_VALUES);
            setProductInventories([createInventory()]);
            setPhotoFiles([]);
            setImageUrl("");
            formRef.current?.reset();
            editorRef.current?.editor?.loadHTML("");
          }
          dispatch(resetProduct());
        }, RESET_DELAY_MS);
      })
      .catch((error) => console.error(error))
      .finally(() => setIssSubmitting(false));
  };

  /* -------------------------------- render -------------------------------- */
  return (
    <div
      className={`"product-form admin m-auto w-full max-w-5xl ${isDuplicate ? "bg-primary/30" : "bg-white"}`}
    >
      <form onSubmit={handleSubmit} ref={formRef} className="space-y-6 p-4">
        {product && (
          <Button
            type="button"
            onClick={() => setIsDuplicate((prev) => !prev)}
            className={`rounded px-4 py-2 font-medium transition-all ${
              isDuplicate
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {isDuplicate ? "Edit Product" : "Duplicate Product"}
          </Button>
        )}
        <Section title="Basics">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              className="w-full"
              label="Sport category"
              required
              {...selectProps("sport_category_id", sportOptions, "sport")}
            />

            <FormInput
              className="w-full"
              label="Status"
              required
              {...selectProps("status", STATUS_OPTIONS, "status")}
            />

            <FormInput
              className="w-full"
              label="MS product code"
              {...inputProps("ms_code")}
              {...activeFieldProps}
            />

            <FormInput
              className="w-full"
              label="Total quantity"
              name="product_quantity"
              type="number"
              value={totalQuantity}
              productStatus="active"
              disabled
            />
          </div>
        </Section>

        <Section title="Product details">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              label="Name"
              placeholder="Product name"
              required
              {...inputProps("name", {
                transform: (value) => value.toLowerCase(),
              })}
            />

            <FormInput
              label="Price: NGN"
              placeholder="Price"
              {...inputProps("price", { type: "number" })}
              {...activeFieldProps}
            />

            <FormInput
              label="MS item code"
              placeholder="Item code"
              {...inputProps("ms_item_code", {
                transform: (value) => value.toLowerCase(),
              })}
              {...activeFieldProps}
            />

            <FormInput
              label={
                <div className="flex w-full items-center justify-between">
                  <span>Colour</span>
                  <span
                    className="block h-8 w-8 rounded-full border border-gray-500 transition-all duration-200 ease-linear"
                    style={{ background: colourSwatch }}
                    aria-hidden
                  />
                </div>
              }
              type="select"
              name="product_colour"
              id="colour"
              placeholder="Choose colours"
              options={colors}
              value={selectedColours
                .map((colour) => colors.find((c) => c.value === colour))
                .filter(Boolean)}
              formatOptionLabel={(option) => (
                <div className="flex items-center gap-2">
                  <span
                    className="h-[22px] w-[22px] rounded-full border border-gray-300"
                    style={{ background: option.hex }}
                  />
                  <span>{option.label}</span>
                </div>
              )}
              onChange={(selected) =>
                setValue("colours")(
                  (selected ?? []).map((option) => option.value),
                )
              }
              isOptionDisabled={() => selectedColours.length >= MAX_COLOURS}
              isMulti
            />

            <FormInput
              label="Product category"
              required
              {...selectProps(
                "product_category_id",
                categoryOptions,
                "category",
              )}
            />

            <FormInput
              label="Gender"
              {...selectProps("gender_id", genderOptions, "gender")}
            />
          </div>
        </Section>

        <Section title="Discount">
          <Button
            type="button"
            onClick={toggleDiscount}
            className={`rounded px-4 py-2 font-medium transition-all ${
              formValues.discount === "active_discount"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {formValues.discount === "active_discount"
              ? "Cancel discount"
              : "Apply discount"}
          </Button>

          {/* The percentage only matters while a discount is active. */}
          {formValues.discount === "active_discount" && (
            <FormInput
              className="mt-4 w-full"
              label="Discount (%)"
              placeholder="e.g. 20"
              {...inputProps("discount_percentage", { type: "number" })}
            />
          )}
        </Section>

        <Section title={`${legend} details`}>
          {specFields.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {specFields.map(({ key, label, options }) => {
                const resolved = options === "levels" ? levelOptions : options;

                return (
                  <FormInput
                    key={key}
                    className="flex-1"
                    label={label}
                    {...(resolved
                      ? selectProps(key, resolved, label.toLowerCase())
                      : inputProps(key))}
                    {...(!resolved && { placeholder: label })}
                  />
                );
              })}
            </div>
          )}

          <InventoryTable
            sizeLabel={sizeLabel}
            sizeOptions={sizeOptions}
            rows={productInventories}
            onAdd={addInventory}
            onChange={updateInventory}
            onRemove={removeInventory}
          />
        </Section>

        <Section title="Images">
          <div className="space-y-4">
            <div>
              <label htmlFor="image" className={labelClass}>
                Image URL
              </label>
              <input
                type="url"
                name="image"
                id="image"
                placeholder="https://"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="photo" className={labelClass}>
                Upload images
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                multiple
                onChange={({ target: { files } }) =>
                  setPhotoFiles(Array.from(files))
                }
                className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-gray-700"
              />
            </div>
          </div>

          <PreviewGrid urls={photoPreviews} />
          <PreviewGrid urls={formValues.photo_urls ?? []} />
        </Section>

        <Section title="Description">
          <div className="mb-1 flex items-center justify-between">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-gray-600"
            >
              Short description
            </label>
            <span
              className={`text-sm ${isDescMax ? "text-red-600" : "text-green-700"}`}
            >
              {descriptionCount} / {MAX_DESCRIPTION}
            </span>
          </div>
          <textarea
            name="description"
            id="description"
            rows={4}
            maxLength={MAX_DESCRIPTION}
            placeholder="Description"
            value={formValues.description ?? ""}
            onChange={({ target: { value } }) => setValue("description")(value)}
            className={fieldClass}
          />

          <p className={`${labelClass} mt-4`}>Full details</p>
          <div className="rounded border border-gray-300">
            <input
              id="trix-description-body"
              type="hidden"
              name="description_body"
              ref={trixInputRef}
            />
            <trix-editor input="trix-description-body" ref={editorRef} />
          </div>
        </Section>

        {formError && (
          <p
            role="alert"
            className="rounded bg-red-100 p-4 text-sm text-red-900"
          >
            {formError}
          </p>
        )}

        <StatusMessage loading={loading} status={status} message={message} />

        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          variant="secondary"
        >
          {product ? "Save changes" : "Add product"}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
